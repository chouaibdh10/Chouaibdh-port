# Comment ajouter un post plus tard

Ce projet utilise des fichiers markdown dans le dossier `guide/` et une liste de posts dans `src/data/posts.js`.

## Etape 1: Creer le fichier markdown

Ajoute un nouveau fichier dans `guide/`, par exemple:

- `guide/mon-nouveau-writeup.md`

Tu peux utiliser ce modele:

```md
---
title: Mon nouveau writeup
published: 2026-03-15
description: Courte description de ton post
image: ''
tags: [CTF, Forensics]
category: CTF
draft: false
---

## Introduction
Ton contenu ici...
```

Note: Le frontmatter (`--- ... ---`) est retire automatiquement a l'affichage du post.

## Etape 2: Importer le markdown dans src/data/posts.js

En haut du fichier `src/data/posts.js`, ajoute un import:

```js
import monNouveauWriteup from '../../guide/mon-nouveau-writeup.md?raw';
```

## Etape 3: Ajouter l'objet post dans le tableau posts

Dans le tableau `posts`, ajoute un objet:

```js
{
  id: 'mon-nouveau-writeup',
  title: 'Mon nouveau writeup',
  date: '2026-03-15',
  description: 'Courte description de ton post',
  tags: ['CTF', 'Forensics'],
  category: 'CTF',
  image: null,
  readTime: '4 min',
  wordCount: 600,
  content: stripFrontmatter(monNouveauWriteup),
}
```

## Etape 4: Verifier

Lance:

```bash
pnpm build
```

Si le build passe, le post apparaitra:

- sur la Home
- dans Archive
- dans la page detail `/posts/<id>`

## Conseils

- Garde un `id` unique (utilise kebab-case).
- Utilise une date au format `YYYY-MM-DD`.
- Les tags et la categorie servent aux filtres de la page Archive.
- Mets a jour `readTime` et `wordCount` pour une meilleure presentation.
