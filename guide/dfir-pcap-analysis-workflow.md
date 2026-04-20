---
title: DFIR PCAP Analysis Workflow (Wireshark + tshark)
published: 2026-04-20
description: A practical seven-step workflow to move from raw packets to an incident narrative.
image: ''
tags: [DFIR, Forensics, Network, PCAP, Wireshark, tshark]
category: Forensics
draft: false
---

# DFIR PCAP Analysis Workflow

> A practical workflow to answer three core questions in an incident:
> what happened, who did it, and when it happened.

## Quick command pack

```bash
tshark -r capture.pcap -q -z io,phs
tshark -r capture.pcap -q -z endpoints,ip
tshark -r capture.pcap -q -z conv,tcp
tshark -r capture.pcap -Y http
tshark -r capture.pcap -Y dns.qry.name
tshark -r capture.pcap -q -z follow,tcp,ascii,0
tshark -r capture.pcap -t ad
```

## 1) Protocol Hierarchy - What kind of network is this?

### Goal
Identify dominant protocols and get immediate context.

### Wireshark
Statistics -> Protocol Hierarchy

### tshark
```bash
tshark -r capture.pcap -q -z io,phs
```

### What to look for
- HTTP-heavy traffic usually means browsing or web applications
- DNS + irregular TCP patterns can suggest beaconing/C2
- SMB/Kerberos/LDAP often indicate an enterprise Windows environment

## 2) Endpoints - Who is talking the most?

### Goal
Find top talkers and suspicious hosts quickly.

### Wireshark
Statistics -> Endpoints -> IPv4

### tshark
```bash
tshark -r capture.pcap -q -z endpoints,ip
```

### What to look for
- One host producing most bytes or packets
- Internal workstation behaving like a server
- High outbound traffic from a normally quiet host

## 3) Conversations - How is traffic structured?

### Goal
Understand sessions and communication patterns.

### Wireshark
Statistics -> Conversations -> TCP

### tshark
```bash
tshark -r capture.pcap -q -z conv,tcp
```

### What to look for
- Long-lived connections to uncommon destinations
- Many short bursts (possible scanning)
- Suspicious destination ports (for example 4444, 1337)

## 4) Protocol filters - What exactly did they do?

### Goal
Move from traffic volume to user/attacker behavior.

### tshark filters
```bash
tshark -r capture.pcap -Y http
tshark -r capture.pcap -Y http.request -T fields -e http.host -e http.request.uri
tshark -r capture.pcap -Y dns.qry.name
tshark -r capture.pcap -Y smb
tshark -r capture.pcap -Y rdp
```

### What to look for
- Visited domains and URL paths
- DNS patterns (DGA-like or repetitive lookups)
- File share activity over SMB
- Remote desktop movement

## 5) Metadata - What tool generated this traffic?

### Goal
Fingerprint clients, scripts, or malware tooling.

### tshark examples
```bash
tshark -r capture.pcap -Y http.user_agent -T fields -e http.user_agent
tshark -r capture.pcap -Y http.request -V
```

### What to look for
- `Chrome` / `Firefox` often map to user activity
- `python-requests`, `curl`, `wget` can indicate automation
- Odd or fake User-Agent strings may indicate malware

## 6) Session reconstruction - What exactly happened?

### Goal
Rebuild full conversations and recover transferred content.

### Wireshark
- Follow TCP Stream
- File -> Export Objects -> HTTP

### tshark
```bash
tshark -r capture.pcap -q -z follow,tcp,ascii,0
tshark -r capture.pcap --export-objects http,output_folder/
```

### What to look for
- Credentials in cleartext protocols
- Downloaded payloads and staging scripts
- API responses carrying sensitive data

## 7) Timeline analysis - When did everything happen?

### Goal
Build a chronological attack narrative.

### tshark
```bash
tshark -r capture.pcap -t ad
tshark -r capture.pcap -T fields -e frame.time -e ip.src -e ip.dst -e _ws.col.Protocol
```

### What to look for
- Initial compromise moment
- Internal pivoting/lateral movement
- Exfiltration window

## Final incident flow

1. Protocol Hierarchy -> What exists?
2. Endpoints -> Who is active?
3. Conversations -> How do they communicate?
4. Protocol filters -> What actions were performed?
5. Metadata -> Which tool generated the traffic?
6. Session reconstruction -> What was exchanged?
7. Timeline -> When did each phase happen?

## Analyst output template

> Initial access observed at [time] from [src] to [dst].
> Activity expanded via [protocol/service].
> Suspicious transfer occurred at [time window].
> Evidence indicates [malware/tool/behavior].
