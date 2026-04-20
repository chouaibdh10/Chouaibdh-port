---
title: HBU BSides - IPv6 Hop-by-Hop Challenge
published: 2025-12-21
description: Extract a hidden flag from ICMPv6 PadN options using XOR and Base64 decoding.
image: ''
tags: [CTF, Network, Forensics, IPv6, Wireshark]
category: CTF
draft: false
---

## Challenge Description

In this PCAP, some ICMPv6 Echo Request packets include an IPv6 Hop-by-Hop header with PadN option bytes carrying hidden data.
The flag is not plaintext: PadN bytes must be reassembled into a Base64 string, then decoded to recover `shellmates{...}`.

## 1) Initial reconnaissance

Open the capture in Wireshark and inspect ICMPv6 traffic with Hop-by-Hop options.
You will notice many packets containing non-trivial PadN values.

Important context:
- PadN normally adds alignment bytes.
- Here, PadN is abused as a covert channel.
- The message is split across many packets because each packet carries only a small chunk.

Example first chunk (sequence 0):
`21 70 2a 2e 20 05 3a 36`

## 2) Extraction and decoding strategy

Cryptanalysis starts with a known plaintext guess.

What we know:
1. First encrypted byte observed: `0x21`
2. Expected plaintext prefix: `shellmates{...}`
3. If payload is Base64, then `shellmates` starts as `c2hl...`, so first char is `c` (`0x63`)

XOR equation:

`0x21 XOR key = 0x63`

Therefore:

`key = 0x21 XOR 0x63 = 0x42`

Recovered XOR key: `0x42`.

## 3) Solver script (Python + tshark)

```python
import base64
import os
import re
import shutil
import subprocess

HEX_RE = re.compile(r"[0-9a-fA-F]+")

def to_wsl_path(path: str) -> str:
    """Convert a Windows path to a WSL path when needed."""
    path = os.path.abspath(path)
    if re.match(r"^[a-zA-Z]:\\\\", path):
        drive = path[0].lower()
        rest = path[2:].replace("\\", "/")
        return f"/mnt/{drive}{rest}"
    return path.replace("\\", "/")

def tshark_cmd() -> list[str]:
    """Use native tshark when available, otherwise fallback to WSL."""
    if shutil.which("tshark"):
        return ["tshark"]
    return ["wsl", "tshark"]

def parse_padn_hex(padn_field: str) -> str:
    """Extract first PadN value as a contiguous hex string."""
    if not padn_field:
        return ""
    first = padn_field.split(",", 1)[0].strip()
    return "".join(HEX_RE.findall(first)).lower()

def solve() -> None:
    pcap_file = "chall.pcap"
    display_filter = "icmpv6.echo.identifier == 0xbeef && ipv6.hopopts && ipv6.opt.padn"
    cmd = tshark_cmd()

    if not os.path.exists(pcap_file):
        print(f"[-] Error: missing file {pcap_file}")
        return

    pcap_arg = to_wsl_path(pcap_file) if cmd[0] == "wsl" else pcap_file

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

    print(f"[*] Running tshark on {pcap_file}...")
    try:
        proc = subprocess.Popen(tshark_args, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        stdout, stderr = proc.communicate()
    except FileNotFoundError:
        print("[-] Error: tshark not found in PATH.")
        return

    if proc.returncode != 0:
        print(f"[-] tshark failed (code={proc.returncode}):")
        print(stderr.strip())
        return

    rows: list[tuple[int, bytes]] = []
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
        if len(pad_hex) < 16:
            continue

        try:
            pad_bytes = bytes.fromhex(pad_hex)
        except ValueError:
            continue

        rows.append((seq, pad_bytes))

    if not rows:
        print("[-] No matching packets found. Check PCAP and identifier filter.")
        return

    rows.sort(key=lambda x: x[0])
    print(f"[*] Found {len(rows)} chunks. Rebuilding payload...")

    key = 0x42
    b64_fragments = ["".join(chr(key ^ b) for b in pad_bytes) for _, pad_bytes in rows]
    full_b64 = "".join(b64_fragments)
    print(f"[*] Reconstructed Base64: {full_b64}")

    try:
        decoded = base64.b64decode(full_b64, validate=True)
        print("\n" + "=" * 40)
        print(f"FINAL RESULT: {decoded.decode('utf-8', errors='replace')}")
        print("=" * 40)
    except Exception as e:
        print(f"[-] Base64 decode error: {e}")

if __name__ == "__main__":
    solve()
```

## Flag

```
shellmates{h0p_by_h0p_0pt10ns_h1d3_s3cr3ts_1n_pl41n_s1ght}
```

## Tools Used

- Wireshark for packet analysis
- tshark for automated field extraction
- Python for XOR and Base64 reconstruction

## Key takeaways

- IPv6 Hop-by-Hop options can hide data in padding fields.
- XOR is reversible; known plaintext can recover the key.
- Unusual header fields are often where covert channels hide.

