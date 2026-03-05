// Post data — add/edit your posts here
const posts = [
  {
    id: "court-hard-forensics-writeup",
    title: "Court (Hard) — CTF Forensics Write-up (MQTT + XOR + Steno)",
    date: "2025-12-28",
    description:
      "Retrouver un flag exfiltré via MQTT en décodant un payload XOR/hex puis en reconstruisant des strokes de sténo.",
    tags: ["CTF", "Forensics", "Network", "PCAP", "MQTT", "Wireshark", "Stenography"],
    category: "CTF",
    image: null,
    readTime: "3 min",
    wordCount: 519,
    content: `
## Challenge Overview

In this forensics challenge, we need to recover a flag that was exfiltrated through the MQTT protocol. The challenge requires decoding XOR/hex payloads and reconstructing stenography strokes.

## Tools Used

- **Wireshark** — Network packet analysis
- **Python** — Custom decoding scripts
- **CyberChef** — Data transformation

## Steps

### 1. Analyzing the PCAP

First, we open the PCAP file in Wireshark and filter for MQTT traffic:

\`\`\`
mqtt
\`\`\`

### 2. Extracting the Payload

After identifying the relevant MQTT messages, we extract the payload data from the publish messages.

### 3. XOR Decoding

Using a Python script to decode the XOR'd payload:

\`\`\`python
def xor_decode(data, key):
    return bytes([b ^ key[i % len(key)] for i, b in enumerate(data)])

payload = bytes.fromhex("...")  # hex payload extracted from PCAP
key = b"..."  # XOR key discovered
decoded = xor_decode(payload, key)
print(decoded)
\`\`\`

### 4. Reconstructing Stenography Strokes

The decoded data contains stenography strokes that need to be reconstructed to reveal the final flag.

## Flag

\`\`\`
FLAG{example_flag_here}
\`\`\`

> This is a sample post. Replace with your actual write-up content!
    `,
  },
  {
    id: "new-ctf-writeup",
    title: "HBU BSides - IPv6 Hop-by-Hop Challenge",
    date: "2025-12-21",
    description:
      "Extraction d'un flag caché dans les options PadN des paquets ICMPv6 avec XOR et Base64.",
    tags: ["CTF", "Network", "Forensics", "IPv6", "Wireshark"],
    category: "CTF",
    image: null,
    readTime: "5 min",
    wordCount: 992,
    content: `
## Challenge Description

This challenge involves finding a hidden flag in ICMPv6 packets. The flag is concealed within the PadN options of IPv6 Hop-by-Hop extension headers.

## Analysis

### 1. Initial PCAP Inspection

Open the capture file in Wireshark and apply the display filter:

\`\`\`
ipv6.hop_opt
\`\`\`

This reveals ICMPv6 packets with Hop-by-Hop extension headers containing suspicious PadN options.

### 2. Extracting Hidden Data

The PadN padding bytes contain non-zero data, which is unusual. We extract these bytes using Scapy:

\`\`\`python
from scapy.all import *

packets = rdpcap("challenge.pcap")
hidden_data = b""

for pkt in packets:
    if IPv6 in pkt and pkt[IPv6].nh == 0:
        # Extract PadN option data
        pass

print(hidden_data.hex())
\`\`\`

### 3. XOR and Base64 Decoding

The extracted data needs to be XOR decoded and then Base64 decoded to reveal the flag.

\`\`\`python
import base64

xored = xor_decode(hidden_data, key)
flag = base64.b64decode(xored)
print(flag.decode())
\`\`\`

## Flag

\`\`\`
FLAG{ipv6_hop_by_hop_hidden}
\`\`\`

> This is a sample post. Replace with your actual write-up content!
    `,
  },
  {
    id: "dz-fellah",
    title: "DZ-Fellah - Plateforme Agricole Algérienne",
    date: "2025-11-30",
    description:
      "Plateforme de mise en relation entre producteurs agricoles algériens et consommateurs locaux.",
    tags: ["React", "Vite", "Web App", "Agriculture", "Frontend"],
    category: "Projects",
    image: null,
    readTime: "1 min",
    wordCount: 178,
    content: `
## Présentation du Projet

**DZ-Fellah** est une plateforme web moderne conçue pour connecter les producteurs agricoles algériens directement avec les consommateurs locaux, éliminant les intermédiaires et favorisant le commerce local.

## Technologies Utilisées

- **React** — Bibliothèque UI
- **Vite** — Build tool rapide
- **Tailwind CSS** — Framework CSS utilitaire
- **Node.js** — Backend API

## Fonctionnalités Principales

### Pour les Producteurs
- 📦 Publication de produits avec photos et descriptions
- 📊 Tableau de bord des ventes
- 📍 Géolocalisation des exploitations

### Pour les Consommateurs
- 🔍 Recherche de produits par catégorie et localisation
- 🛒 Panier d'achat et commandes
- ⭐ Système d'avis et de notation

## Liens

- [Code Source sur GitHub](https://github.com/chouaibdh10)

> This is a sample post. Replace with your actual project content!
    `,
  },
  {
    id: "tryhackme-security-footage-writeup",
    title: "TryHackMe - Security Footage Recovery Writeup",
    date: "2025-11-06",
    description:
      "Recovering destroyed security footage from a PCAP file using Wireshark and Foremost.",
    tags: ["CTF", "Forensics", "TryHackMe", "Wireshark", "Network Analysis"],
    category: "CTF",
    image: null,
    readTime: "2 min",
    wordCount: 468,
    content: `
## Challenge Info

**Platform:** TryHackMe
**Difficulty:** Medium
**Category:** Forensics

## Overview

In this challenge, we're tasked with recovering destroyed security footage from a network capture (PCAP) file. The footage was being streamed over the network when it was intercepted.

## Solution

### Step 1: Analyzing Network Traffic

Open the PCAP file in Wireshark:

\`\`\`bash
wireshark capture.pcap
\`\`\`

Look for HTTP streams or large data transfers that might contain video data.

### Step 2: Extracting Files with Foremost

Use Foremost to carve files from the captured data:

\`\`\`bash
foremost -i extracted_data.bin -o output/
\`\`\`

### Step 3: Reassembling the Footage

The carved files need to be reassembled in the correct order.

\`\`\`python
import os

fragments = sorted(os.listdir("output/"))
with open("recovered_video.mp4", "wb") as out:
    for frag in fragments:
        with open(f"output/{frag}", "rb") as f:
            out.write(f.read())
\`\`\`

## Flag

\`\`\`
THM{security_footage_recovered}
\`\`\`

> This is a sample post. Replace with your actual write-up content!
    `,
  },
  {
    id: "nxtrace-challenge",
    title: "My Nextrace Challenge Writeup",
    date: "2025-10-24",
    description:
      "A multi-step forensics challenge combining steganography and EXIF metadata analysis.",
    tags: ["CTF", "Forensics", "steghide", "exiftool"],
    category: "CTF",
    image: null,
    readTime: "1 min",
    wordCount: 186,
    content: `
## Challenge Overview

This challenge involves a multi-step forensics investigation combining steganography and EXIF metadata analysis.

## Tools Used

- **steghide** — Steganography tool for hiding/extracting data
- **exiftool** — Metadata extraction tool
- **Wireshark** — Packet analysis
- **Foremost** — File carving tool

## Solution

### Step 1: EXIF Metadata Analysis

First, we check the image for hidden metadata:

\`\`\`bash
exiftool challenge_image.jpg
\`\`\`

This reveals a suspicious comment field containing encoded data.

### Step 2: Steganography Extraction

Using steghide to extract hidden data from the image:

\`\`\`bash
steghide extract -sf challenge_image.jpg -p "password_from_exif"
\`\`\`

### Step 3: Decoding the Result

The extracted file contains the final flag encoded in base64:

\`\`\`bash
cat extracted.txt | base64 -d
\`\`\`

## Flag

\`\`\`
FLAG{steg_and_exif_combined}
\`\`\`

> This is a sample post. Replace with your actual write-up content!
    `,
  },
];

export default posts;

// Helper: get all unique categories with counts
export function getCategories() {
  const map = {};
  posts.forEach((p) => {
    map[p.category] = (map[p.category] || 0) + 1;
  });
  return Object.entries(map).map(([name, count]) => ({ name, count }));
}

// Helper: get all unique tags
export function getTags() {
  const set = new Set();
  posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return [...set].sort();
}
