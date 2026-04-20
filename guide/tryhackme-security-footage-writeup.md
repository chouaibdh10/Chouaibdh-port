---
title: TryHackMe - Security Footage Recovery Writeup
published: 2025-11-06
description: Recover destroyed security footage from a PCAP by carving JPEG frames with Wireshark and Foremost.
image: ''
tags: [CTF, Forensics, TryHackMe, Wireshark, Network Analysis]
category: CTF
draft: false
---

## Challenge Description

Room: https://tryhackme.com/room/securityfootage

An office break-in occurred and the hard drives containing CCTV footage were destroyed.
You receive a `.pcap` file with network traffic and must recover the footage from captured HTTP data.

## Tools Used

- **Wireshark** for packet analysis and stream inspection
- **Foremost** for file carving based on signatures

## Step-by-step solution

### 1) Open the PCAP in Wireshark

```bash
wireshark security-footage.pcap
```

Focus on HTTP traffic.

### 2) Inspect TCP streams

In Wireshark, right-click an HTTP packet and choose:

- Follow -> TCP Stream

Look for headers like:

```http
Content-Type: image/jpeg
Content-Length: 20485
```

These indicate JPEG image content in transit.

### 3) Filter JPEG-related packets

Apply this display filter:

```text
tcp contains "jpeg"
```

Multiple hits usually mean multiple image frames.

### 4) Carve images with Foremost

Install Foremost (if needed):

```bash
sudo apt install foremost
```

Run Foremost on the PCAP:

```bash
foremost -i security-footage-1648933966395.pcap -o results_folder
```

Check carved JPEG files:

```bash
ls results_folder/jpg/
```

Expected output pattern:

```text
00000000.jpg  00000001.jpg  00000002.jpg  00000003.jpg  ...
```

### 5) View recovered frames

```bash
eog results_folder/jpg/00000000.jpg
```

Or browse quickly:

```bash
feh results_folder/jpg/
```

## Result

Recovered multiple JPEG frames from the PCAP, effectively reconstructing the destroyed security footage.

## Key takeaways

- PCAP files can contain full transferred files, not only metadata
- Wireshark filters accelerate forensic triage
- Foremost is effective for automated carving from raw capture data
- HTTP analysis is a core network forensics skill

## Additional resources

- [Wireshark Documentation](https://www.wireshark.org/docs/)
- [Foremost Manual](http://foremost.sourceforge.net/)
- [TryHackMe](https://tryhackme.com/)

This writeup is for educational purposes only. Analyze network captures only when authorized.
