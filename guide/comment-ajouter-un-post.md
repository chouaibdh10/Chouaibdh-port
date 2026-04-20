# How to Add a New Post Later

This project uses markdown files in the `guide/` folder and a post list in `src/data/posts.js`.

## Step 1: Create the markdown file

Add a new file in `guide/`, for example:

- `guide/my-new-writeup.md`

You can use this template:

```md
---
title: My new writeup
published: 2026-03-15
description: Short description of your post
image: ''
tags: [CTF, Forensics]
category: CTF
draft: false
---

## Introduction
Your content here...
```

Note: The frontmatter (`--- ... ---`) is automatically removed when rendering the post.

## Step 2: Import the markdown file in src/data/posts.js

At the top of `src/data/posts.js`, add an import:

```js
import myNewWriteup from '../../guide/my-new-writeup.md?raw';
```

## Step 3: Add a post object to the posts array

In the `posts` array, add an object like this:

```js
{
  id: 'my-new-writeup',
  title: 'My new writeup',
  date: '2026-03-15',
  description: 'Short description of your post',
  tags: ['CTF', 'Forensics'],
  category: 'CTF',
  image: null,
  readTime: '4 min',
  wordCount: 600,
  content: stripFrontmatter(myNewWriteup),
}
```

## Step 4: Verify

Run:

```bash
pnpm build
```

If the build passes, the post will appear:

- on Home
- in Archive
- on the detail page `/posts/<id>`

## Tips

- Keep `id` unique (use kebab-case).
- Use date format `YYYY-MM-DD`.
- Tags and category are used by Archive filters.
- Update `readTime` and `wordCount` for better presentation.
