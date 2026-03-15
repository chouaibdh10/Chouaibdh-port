---
title: HBU BSides - IPv6 Hop-by-Hop Challenge
published: 2025-12-21
description: Extraction d'un flag caché dans les options PadN des paquets ICMPv6 avec XOR et Base64
image: ''
tags: [CTF, Network, Forensics, IPv6, Wireshark]
category: CTF
draft: false
---

## 🕵️ Challenge Description

> Dans le PCAP, certains paquets ICMPv6 Echo Request ont un en-tête IPv6 Hop-by-Hop. Dans cet en-tête, il y a une option PadN (padding) qui contient 8 octets "cachés". Le flag n'est pas en clair : ces octets PadN servent à reconstruire une chaîne Base64, puis on décode cette Base64 pour obtenir `shellmates{...}`.

---

## 🔍 1. Analyse préliminaire & Reconnaissance

En ouvrant le fichier PCAP avec Wireshark, on observe une grande quantité de trafic IPv6. Un premier coup d'œil rapide révèle des paquets **ICMPv6 Echo Request** (ping).


![Analyse Wireshark](../../assets/images/hbu-wireshark-1.png)

 **ICMPv6 Echo Request** (ping): 
 
![ICMPv6 Echo Request](../../assets/images/hbu-wireshark-2.png)

**Hop-by-Hop = message IPv6 que TOUS les routeurs doivent lire.**

> PADN = Padding N bytes
>👉 ça veut dire “ajouter N octets vides”
  On l’utilise uniquement pour l’alignement, pas pour transporter des données.

il y a **beaucoup** de valeurs PadN parce que le message caché (le flag) est trop long pour tenir dans un seul paquet. Il a été **découpé en morceaux**.

Imagine que je veuille t'envoyer une longue lettre par la poste, mais je n'ai que des toutes petites enveloppes qui ne peuvent contenir que 8 lettres chacune.

1. Je découpe ma lettre en bandes
2. Je mets la première bande dans l'enveloppe n°1
3. Je mets la deuxième bande dans l'enveloppe n°2, etc.

Le `21 70 2a 2e 20 05 3a 36` c'est uniquement le contenu de **l'enveloppe n°1** (le paquet avec `sequence_number = 0`).

---

## 🔐 2. Extraction et Décodage

En cryptographie, quand on veut casser un code, on commence toujours par le **début du message**.

1. **Ce que j'ai (Chiffré) :** Je vois `0x21` comme premier octet
2. **Ce que je devine (Clair) :** Je sais que c'est un challenge CTF "Shellmates". Le flag commence sûrement par `shellmates{...}`
3. **L'astuce Base64 :** Le challenge dit que c'est de la Base64
   - Si je transforme le mot "shellmates" en Base64, ça donne : `c2hlbGxtYXRlcw==`
   - La première lettre de la Base64 est donc **`c`**

---

## 🧮 3. Le calcul pour trouver la clé (0x42)

C'est là que la magie opère. J'ai une équation à trou :

> **`0x21` (chiffré)** XOR **`?` (clé)** = **`c` (clair)**

En informatique, la lettre `c` minuscule a la valeur hexadécimale `0x63` (c'est le code ASCII standard).

L'équation devient : `0x21` XOR `?` = `0x63`

Grâce à la propriété du XOR, je peux inverser le calcul pour trouver le point d'interrogation : `0x21` XOR `0x63` = `?`

Si tu tapes ça dans une calculatrice de programmeur (ou Python) : `0x21 ^ 0x63` donne **`0x42`**.

**C'est comme ça qu'on trouve la clé `0x42`.** On a comparé le premier octet du paquet (`0x21`) avec la première lettre qu'on espérait trouver (`c` ou `0x63`).

---

## 💻 4. Script de résolution (Python + tshark)

```python
import base64
import os
import re
import shutil
import subprocess
import sys

HEX_RE = re.compile(r"[0-9a-fA-F]+")

def to_wsl_path(path: str) -> str:
    """Convertit un chemin Windows en chemin WSL si nécessaire."""
    path = os.path.abspath(path)
    if re.match(r"^[a-zA-Z]:\\\\", path):
        drive = path[0].lower()
        rest = path[2:].replace("\\", "/")
        return f"/mnt/{drive}{rest}"
    return path.replace("\\", "/")

def tshark_cmd() -> list[str]:
    """Détecte si on doit utiliser tshark directement ou via wsl."""
    if shutil.which("tshark"):
        return ["tshark"]
    return ["wsl", "tshark"]

def parse_padn_hex(padn_field: str) -> str:
    """
    Extrait la première valeur PadN comme une chaîne hex contiguë.
    Tshark peut retourner plusieurs options séparées par des virgules.
    """
    if not padn_field:
        return ""
    # On prend le premier champ avant la virgule
    first = padn_field.split(",", 1)[0].strip()
    # On nettoie pour ne garder que l'hexa
    hex_str = "".join(HEX_RE.findall(first))
    return hex_str.lower()

def solve() -> None:
    # --- CONFIGURATION ---
    pcap_file = "chall.pcap"  # <--- Vérifie le nom de ton fichier ici
    
    # Filtre Wireshark : 
    # 1. Identifiant 0xbeef
    # 2. Présence de Hop-by-Hop
    # 3. Présence de PadN
    display_filter = "icmpv6.echo.identifier == 0xbeef && ipv6.hopopts && ipv6.opt.padn"

    cmd = tshark_cmd()
    
    # Gestion du chemin pour WSL si nécessaire
    if cmd[0] == "wsl":
        if not os.path.exists(pcap_file):
            print(f"[-] Erreur: Le fichier {pcap_file} est introuvable.")
            return
        pcap_arg = to_wsl_path(pcap_file)
    else:
        if not os.path.exists(pcap_file):
            print(f"[-] Erreur: Le fichier {pcap_file} est introuvable.")
            return
        pcap_arg = pcap_file

    # Commande tshark pour extraire sequence_number et padn
    tshark_args = cmd + [
        "-r", pcap_arg,
        "-Y", display_filter,
        "-T", "fields",
        "-E", "separator=\t",
        "-E", "occurrence=a",
        "-E", "quote=n",
        "-e", "icmpv6.echo.sequence_number",
        "-e", "ipv6.opt.padn",
    ]

    print(f"[*] Analyse de {pcap_file} avec tshark...")
    try:
        proc = subprocess.Popen(tshark_args, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        stdout, stderr = proc.communicate()
    except FileNotFoundError:
        print("[-] Erreur : tshark n'est pas installé ou n'est pas dans le PATH.")
        return

    if proc.returncode != 0:
        print(f"[-] Erreur tshark (code={proc.returncode}):")
        print(stderr.strip())
        return

    rows: list[tuple[int, bytes]] = []
    
    # Parsing des résultats
    for line in stdout.splitlines():
        if not line.strip():
            continue
        parts = line.split("\t")
        if len(parts) < 2:
            continue
            
        try:
            seq = int(parts[0].strip())
        except ValueError:
            continue

        pad_hex = parse_padn_hex(parts[1].strip())
        
        # On ignore les petits paddings d'alignement (ex: 2 octets = 4 chars hex)
        # On cherche le payload de 8 octets (16 chars hex)
        if len(pad_hex) < 16:
            continue

        try:
            pad_bytes = bytes.fromhex(pad_hex)
        except ValueError:
            continue
            
        rows.append((seq, pad_bytes))

    if not rows:
        print("[-] Aucun paquet correspondant trouvé.")
        print("    Vérifie que le PCAP est bon et que l'ID est bien 0xbeef.")
        return

    # Tri par numéro de séquence pour remettre dans l'ordre
    rows.sort(key=lambda x: x[0])

    print(f"[*] {len(rows)} morceaux trouvés. Reconstitution...")

    # Reconstitution Base64 avec le XOR 0x42
    # Chaque paquet contient 8 octets qui doivent être XORés
    key = 0x42
    b64_fragments = []
    
    for _, pad_bytes in rows:
        # Pour chaque octet b du PadN, on fait b XOR 0x42
        fragment = "".join(chr(key ^ b) for b in pad_bytes)
        b64_fragments.append(fragment)
    
    full_b64 = "".join(b64_fragments)
    print(f"[*] Chaîne Base64 reconstruite : {full_b64}")

    # Décodage final
    try:
        decoded = base64.b64decode(full_b64, validate=True)
        flag = decoded.decode("utf-8", errors="replace")
        print("\n" + "="*40)
        print(f"RESULTAT FINAL : {flag}")
        print("="*40)
    except Exception as e:
        print(f"[-] Erreur de décodage Base64 : {e}")
        # Tentative en mode relax (ajout de padding si manquant)
        try:
            decoded = base64.b64decode(full_b64 + "==")
            print(f"[?] Tentative avec padding forcé : {decoded.decode('utf-8', errors='replace')}")
        except:
            pass

if __name__ == "__main__":
    solve()
```

## 🏁 Flag

```
shellmates{h0p_by_h0p_0pt10ns_h1d3_s3cr3ts_1n_pl41n_s1ght}
```

---

## 🧰 Tools Used

- **Wireshark** — Analyse des paquets PCAP
- **tshark** — Extraction automatisée des données
- **Python** — Script de décodage XOR + Base64

---

## 🎓 Key Takeaways

- Les options IPv6 Hop-by-Hop peuvent cacher des données dans le padding (PadN)
- Le XOR est réversible : si tu connais un bout du clair, tu peux retrouver la clé
- Toujours vérifier les champs "inhabituels" dans les headers réseau

