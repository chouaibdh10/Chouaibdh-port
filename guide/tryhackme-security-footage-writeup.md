---
title: TryHackMe - Security Footage Recovery Writeup
published: 2025-11-06
description: Recovering destroyed security footage from a PCAP file using Wireshark and Foremost
image: ''
tags: [CTF, Forensics, TryHackMe, Wireshark, Network Analysis]
category: CTF
draft: false
---

## 🕵️ Challenge Description

Security Footage — TryHackMe Writeup

Category:** (Forensics / Network) /// Difficulty:** Medium ///// Room link:** https://tryhackme.com/room/securityfootage

Someone broke into our office last night, but they destroyed the hard drives with the security footage. Can you recover the footage?

We are given a `.pcap` file that contains HTTP traffic. Our goal is to extract and recover the images (security footage frames) from this capture.

## 🧰 Tools Used

- **Wireshark** — For analyzing HTTP packets and TCP streams
- **Foremost** — For extracting image files based on file signatures

## 🧾 Summary of Steps

### 1️⃣ Open the .pcap file in Wireshark

Make sure your terminal is in the same directory as the `.pcap` file.

```bash
wireshark security-footage.pcap
```

Wireshark displays all network packets — look for HTTP traffic.

### 2️⃣ Checking the TCP Stream

Once we inspect the TCP stream, we notice key indicators confirming the presence of image data.

**Steps:**

1. In Wireshark, right-click on any HTTP packet and choose:
   - **Follow → TCP Stream** (or use the shortcut `Ctrl + Alt + Shift + T`)

2. You'll see the full HTTP exchange — headers + content.

3. Look for headers such as:

```http
Content-Type: image/jpeg
Content-Length: 20485
```

:::important
These headers confirm that the traffic contains JPEG images.
:::

### 3️⃣ Applying a Filter for JPEG Traffic

To isolate relevant packets, apply the filter:

```
tcp contains "jpeg"
```

This filter looks for the ASCII string `jpeg` within TCP payloads — usually part of HTTP headers. It's a quick way to find all packets related to image transfers.

:::tip
Multiple matches typically indicate multiple images (frames) are being transmitted.
:::

### 4️⃣ Extracting Images Automatically with Foremost

Instead of manually saving each image, we can use **Foremost**, a forensic tool that identifies and extracts files based on header/footer signatures.

#### 🔹 Install Foremost

```bash
sudo apt install foremost
```

#### 🔹 Run Foremost on the .pcap file

```bash
foremost -i security-footage-1648933966395.pcap -o results_folder
```

Foremost scans the raw data and extracts all recognized files — in this case, JPEG images — into the `results_folder/`.

#### 🔹 Check the Output Folder

Inside `results_folder/jpg/`, you should find several images:

```bash
ls results_folder/jpg/
```

Expected output:
```
00000000.jpg  00000001.jpg  00000002.jpg  00000003.jpg  ...
```

### 5️⃣ Viewing the Recovered Frames

Open the first image and hold down the `→` (right arrow) key on your keyboard. This creates an animated playback effect, simulating the security footage.

```bash
# Using an image viewer
eog results_folder/jpg/00000000.jpg

# Or use feh for quick browsing
feh results_folder/jpg/
```

## ✅ Result

You successfully recovered multiple JPEG frames from the `.pcap` file — effectively reconstructing the destroyed security footage.

## 🔑 Key Takeaways

- **PCAP files** can contain more than just network metadata — they hold actual file data
- **Wireshark filters** are powerful for isolating specific traffic types
- **Foremost** is an excellent tool for automated file carving from raw data
- **HTTP traffic analysis** is a fundamental skill in network forensics

## 📚 Additional Resources

- [Wireshark Documentation](https://www.wireshark.org/docs/)
- [Foremost Manual](http://foremost.sourceforge.net/)
- [TryHackMe - Network Forensics](https://tryhackme.com/)

## 🙏 Acknowledgments

Thanks to **TryHackMe** for this awesome forensic room! And thanks for reading my writeup! 🚀

---

### Related Challenges

If you enjoyed this challenge, you might also like:
- Network Miner - Advanced PCAP analysis
- Wireshark CTF - More packet analysis challenges
- Digital Forensics Case Studies

:::note
This writeup is for educational purposes only. Always ensure you have permission before analyzing network traffic.
:::
