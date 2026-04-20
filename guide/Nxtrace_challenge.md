---
title: My Nextrace Challenge Writeup
published: 2025-10-24
description: Solving a steganography challenge by extracting a hidden passphrase from EXIF metadata.
image: ''
tags: [CTF, Forensics, steghide, exiftool]
category: CTF
draft: false
---

## Challenge Description

This is a simple forensics and steganography challenge.
You are given an image and must discover a hidden passphrase in metadata to extract a concealed file (`flag.txt`).

Given file: **`can_u_see.jpg`**

Goal:
- Analyze EXIF metadata
- Decode a hidden Base64 string
- Use `steghide` with the recovered passphrase

## Tools Used

- **exiftool** for EXIF metadata inspection
- **base64** for decoding the hidden value
- **steghide** for extracting concealed files

## Step-by-step solution

### 1) Inspect image metadata

```bash
exiftool can_u_see.jpg
```

Suspicious output:

```
UserComment: cm91Z2k=
```

### 2) Decode the Base64 value

```bash
echo 'cm91Z2k=' | base64 -d
```

Output:

```
rougi
```

### 3) Extract hidden file with steghide

```bash
steghide extract -sf can_u_see.jpg -p rougi
```

Expected message:

```
wrote extracted file "flag.txt"
```

Read the flag:

```bash
cat flag.txt
```

Output:

```
nexus{chouaib_is_hereeeeeee}
```

## Result

You recover the flag by combining metadata analysis and steganography extraction.

**Flag:** `nexus{chouaib_is_hereeeeeee}`