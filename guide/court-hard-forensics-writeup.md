---
title: 'Court (Hard) - CTF Forensics Write-up (MQTT + XOR + Steno)'
published: 2025-12-28
description: Recover a flag exfiltrated over MQTT by decoding XOR/hex payloads and rebuilding stenography strokes.
image: '../../assets/images/image2.png'
tags: [CTF, Forensics, Network, PCAP, MQTT, Wireshark, Stenography]
category: CTF
draft: false
---

## Objective
Recover the flag in `Cybears{...}` format from two artifacts:
- `email(1).eml` (email with a malicious attachment)
- `chall.pcapng` (network capture)

This write-up follows a reproducible pipeline:
1. Detect data exfiltration in the PCAP (MQTT)
2. Extract the payload
3. Decrypt it (XOR + hex)
4. Rebuild stenography strokes (court reporter style)
5. Translate strokes to text and recover the flag

## 1) Email triage
### 1.1 Findings
Open `email(1).eml` and inspect the attachment:
- An executable (`Transcript_Review.exe`), typical dropper behavior.

### 1.2 Working hypothesis
The executable likely captures keystrokes and exfiltrates them. Instead of executing it, pivot directly to `chall.pcapng`.

## 2) PCAP analysis: detect MQTT exfiltration
### 2.1 Indicators
From recovered code and traffic behavior, exfiltration uses MQTT with:
- Broker: `5.182.33.151:1883`
- Topic: `keystrokes/data`
- Encryption: XOR with key `st1k4`, then hex encoding

### 2.2 Quick validation with tshark (via WSL)
Convert a Windows path to WSL path:
```bash
wsl wslpath -a 'C:/Users/acer/Desktop/forens/chall.pcapng'
# -> /mnt/c/Users/acer/Desktop/forens/chall.pcapng
```

List MQTT traffic to/from the broker:
```bash
wsl -e tshark -r /mnt/c/Users/acer/Desktop/forens/chall.pcapng \
  -Y 'tcp.port==1883 && ip.addr==5.182.33.151' \
  -T fields -e frame.number -e ip.src -e ip.dst -e mqtt.msgtype -e mqtt.topic
```

Extract MQTT PUBLISH payloads on the exfiltration topic:
```bash
wsl -e tshark -r /mnt/c/Users/acer/Desktop/forens/chall.pcapng \
  -Y 'mqtt.msgtype==3 && mqtt.topic=="keystrokes/data"' \
  -T fields -e frame.number -e mqtt.msg
```

`mqtt.msg` appears as a hex string. Multiple values can be comma-separated when several PUBLISH messages are encapsulated in one segment.

## 3) Payload decryption (XOR + hex)
### 3.1 Cipher model
The malware creates JSON and applies:
- `cipher = XOR(plaintext_bytes, key=b"st1k4")`
- Sends `cipher.hex()` over MQTT

To decrypt:
1. `cipher_bytes = bytes.fromhex(hex_string)`
2. `plain_bytes[i] = cipher_bytes[i] ^ key[i % len(key)]`
3. `plain_text = plain_bytes.decode('utf-8')`
4. `json.loads(plain_text)`

### 3.2 Decoded record format
Each decrypted payload is a JSON object such as:
```json
{"c": "...", "t": "2025-..."}
```
- `c`: chord (combined key press)
- `t`: timestamp

Generated files:
- `decoded_records.json`: full decoded JSON events
- `decoded_chords.json`: simplified `(timestamp, chord)` list

## 4) Rebuilding strokes: the core insight
### 4.1 Why this is not classic keylogging
The "Court" theme points to stenography. Observed behavior:
- chords change extremely fast
- within one word, chord strings progressively grow

This matches rolling/arpeggiated input: near-simultaneous key presses recorded as intermediate states.

### 4.2 Burst-group heuristic
Group events that are very close in time (for example, within a ~40 ms window) and keep the longest chord in each group.

Result:
- `strokes.txt`: stable QWERTY steno strokes (20 strokes in this solve)

## 5) Steno translation -> text
### 5.1 QWERTY to canonical steno (Plover)
`strokes.txt` uses QWERTY steno keys (Plover layout). Convert each stroke into canonical order:
`STKPWHR AO*EU FRPBLGTSDZ`.

Output:
- `steno_strokes.txt`: canonicalized strokes

### 5.2 Dictionary translation
Use `plover_main.json` to map strokes to words.

`translated.txt` contains readable text plus dictionary meta tokens:
- `{^_^}` behaves like separator (`_`)
- `{a^}` attaches letter `a` to the next token

Resolving these meta tokens yields the final flag.

## 6) Scripts and reproducibility
Two scripts automate the full chain:
- `solve_pcap.py`
- Reads `chall.pcapng`
- Extracts MQTT PUBLISH records
- Detects hex payloads
- XOR-decrypts with `st1k4`
- Writes `decoded_records.json`, `decoded_chords.json`, `strokes.txt`

- `translate_strokes.py`
- Reads `strokes.txt`
- Converts to canonical steno strokes
- Translates via `plover_main.json`
- Writes `steno_strokes.txt`, `translated.txt`

Typical run:
```powershell
python .\solve_pcap.py
python .\translate_strokes.py
```

## 7) Flag
Recovered flag:

**`Cybears{hacker_worst_fear_is_a_stenographer}`**
