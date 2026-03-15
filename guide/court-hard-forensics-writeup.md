---
title: 'Court (Hard) — CTF Forensics Write-up (MQTT + XOR + Steno)'
published: 2025-12-28
description: Retrouver un flag exfiltré via MQTT en décodant un payload XOR/hex puis en reconstruisant des strokes de sténo.
image: '../../assets/images/image2.png'
tags: [CTF, Forensics, Network, PCAP, MQTT, Wireshark, Stenography]
category: CTF
draft: false
---


## Objectif
Retrouver le flag au format `Cybears{...}` à partir de deux artefacts :
- `email(1).eml` (email avec pièce jointe malveillante)
- `chall.pcapng` (capture réseau)

Ce write-up décrit une chaîne de résolution reproductible :
1) Identifier l’exfiltration dans le PCAP (MQTT)
2) Extraire le payload
3) Déchiffrer (XOR + hex)
4) Recomposer des "strokes" de sténo (court reporter)
5) Traduire en texte → flag

## 1) Triage de l’email
### 1.1 Constats
Ouvrir `email(1).eml` et repérer la pièce jointe :
- Un exécutable (type `Transcript_Review.exe`), typique d’un dropper.

### 1.2 Hypothèse de travail
L’exécutable est un malware qui capture des frappes et les exfiltre. Plutôt que d’exécuter, on pivote sur la capture réseau `chall.pcapng`.

## 2) Analyse du PCAP : détecter l’exfiltration MQTT
### 2.1 Indicateurs
Dans le code récupéré (ou via inspection), l’exfil se fait via MQTT :
- Broker : `5.182.33.151:1883`
- Topic : `keystrokes/data`
- Chiffrement : XOR avec la clé `st1k4`, puis encodage hex

### 2.2 Vérification rapide avec tshark (via WSL)
Convertir le chemin Windows en chemin WSL :
```bash
wsl wslpath -a 'C:/Users/acer/Desktop/forens/chall.pcapng'
# -> /mnt/c/Users/acer/Desktop/forens/chall.pcapng
```

Lister le trafic MQTT vers le broker :
```bash
wsl -e tshark -r /mnt/c/Users/acer/Desktop/forens/chall.pcapng \
  -Y 'tcp.port==1883 && ip.addr==5.182.33.151' \
  -T fields -e frame.number -e ip.src -e ip.dst -e mqtt.msgtype -e mqtt.topic
```

Extraire les messages MQTT PUBLISH du topic :
```bash
wsl -e tshark -r /mnt/c/Users/acer/Desktop/forens/chall.pcapng \
  -Y 'mqtt.msgtype==3 && mqtt.topic=="keystrokes/data"' \
  -T fields -e frame.number -e mqtt.msg
```

`mqtt.msg` est affiché comme une chaîne hex (souvent plusieurs valeurs séparées par des virgules quand plusieurs PUBLISH sont encapsulés dans un même segment).

## 3) Déchiffrement du payload (XOR + hex)
### 3.1 Schéma
Le malware construit un JSON, puis applique :
- `cipher = XOR(plaintext_bytes, key=b"st1k4")`
- envoi de `cipher.hex()` (texte hex)

Pour déchiffrer :
1) `cipher_bytes = bytes.fromhex(hex_string)`
2) `plain_bytes[i] = cipher_bytes[i] ^ key[i % len(key)]`
3) `plain_text = plain_bytes.decode('utf-8')`
4) `json.loads(plain_text)`

### 3.2 Format des données
Chaque message décodé est un objet JSON du type :
```json
{"c": "...", "t": "2025-..."}
```
- `c` : un "chord" (combinaison de touches)
- `t` : timestamp

Les fichiers générés pendant la résolution :
- `decoded_records.json` : enregistrements JSON décodés (évènements)
- `decoded_chords.json` : liste (timestamp, chord)

## 4) Reconstitution des "strokes" : la clé du challenge
### 4.1 Pourquoi ce n’est pas du keylogging classique
Le thème "Court" pointe vers la sténographie (court reporter). On observe que :
- les chords changent très vite,
- dans un même mot, on voit des séquences où le chord s’allonge progressivement.

C’est typique d’un "roll" (arpeggio) : l’utilisateur appuie presque simultanément plusieurs touches, mais la capture produit une série d’états intermédiaires.

### 4.2 Heuristique de regroupement (burst)
On regroupe les évènements très proches (par exemple dans une fenêtre d’environ 40 ms) et on conserve le chord le plus long du groupe.

Résultat : une liste de strokes stables.
- `strokes.txt` : strokes QWERTY (20 strokes dans cette résolution)

## 5) Traduction sténo → texte
### 5.1 Mapping QWERTY vers sténo (Plover)
Les strokes dans `strokes.txt` sont en touches clavier "QWERTY steno" (layout Plover). On convertit ces touches en stroke canonique sténo (ordre `STKPWHR AO*EU FRPBLGTSDZ`).

Sorties utiles :
- `steno_strokes.txt` : strokes canonisés

### 5.2 Dictionnaire
On utilise le dictionnaire Plover (fichier `plover_main.json`) pour traduire les strokes en mots.

La sortie `translated.txt` contient un texte lisible + des tokens "meta" du dictionnaire :
- `{^_^}` agit comme séparateur (underscore `_`)
- `{a^}` colle la lettre `a` au token suivant

En remplaçant ces metas correctement, on obtient le flag.

## 6) Scripts fournis / reproductibilité
Deux scripts dans le dossier permettent de refaire la chaîne complète :
- `solve_pcap.py`
  - lit `chall.pcapng`
  - extrait les PUBLISH MQTT
  - détecte les payloads hex
  - XOR-décrypte avec `st1k4`
  - écrit `decoded_records.json`, `decoded_chords.json`, `strokes.txt`

- `translate_strokes.py`
  - lit `strokes.txt`
  - convertit en strokes sténo canonique
  - traduit via `plover_main.json`
  - écrit `steno_strokes.txt`, `translated.txt`

Exécution typique :
```powershell
python .\solve_pcap.py
python .\translate_strokes.py
```

## 7) Flag
Le texte reconstruit encode le flag suivant :

**`Cybears{hacker_worst_fear_is_a_stenographer}`**
