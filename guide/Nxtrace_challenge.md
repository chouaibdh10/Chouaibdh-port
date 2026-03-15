---
title:  My Nextrace challenge Writeup
published: 2025-10-24
description: Recovering destroyed security footage from a PCAP file using Wireshark and Foremost
image: ''
tags: [CTF, Forensics, steghide, exiftool]
category: CTF
draft: false
---

## 🕵️ Challenge Description

> simple  Forensics / Steganography challenge.  
> Players receive an image and must discover a hidden passphrase within its metadata to extract a concealed file (`flag.txt`) inside the image.

We are given an image file **`can_u_see.jpg`**.  
Our goal is to **analyze the EXIF metadata**, **decode the hidden Base64 string**, and then **use `steghide`** with the decoded passphrase to recover the hidden flag file.

---

## 🧰 Tools Used

* **exiftool** — To view and analyze EXIF metadata.  
* **base64** — To decode the hidden Base64-encoded string.  
* **steghide** — To extract hidden files from image or audio containers.

---

## 🧾 Summary of Steps

### 1️⃣ Inspect the Image Metadata

Use `exiftool` to inspect the EXIF metadata of the image:

```bash
exiftool can_u_see.jpg
```

In the output, we notice a suspicious Base64 string:

```
UserComment: cm91Z2k=
```

This clearly looks like Base64-encoded text — our hidden clue.

---

### 2️⃣ Decode the Base64 String

```bash
echo 'cm91Z2k=' | base64 -d
```

Output:

```
rougi
```

---

### 3️⃣ Extract the Hidden File with Steghide

Now that we have the passphrase, we can use steghide to extract the hidden file from the image:

```bash
steghide extract -sf can_u_see.jpg -p rougi
```

If successful, steghide confirms:

```
wrote extracted file "flag.txt"
```

```bash
cat flag.txt
```

Output:

```
nexus{chouaib_is_hereeeeeee}
```

---

## ✅ Result

You successfully extracted the hidden flag from the image by:

1. Reading the EXIF metadata
2. Decoding the Base64 string
3. Using the passphrase with steghide

🎉 **Flag:** `nexus{chouaib_is_hereeeeeee}`