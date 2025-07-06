---
title: "Switching to Astro"
description: "Adios Bootstrap. Hello, Tailwind and Astro"
publishDate: 2025-07-05
tags: ["astro", "web development"]
---

## Why Astro?

I originally built this personal website using HTML and Bootstrap, and recently migrated to Astro for its simplicity and static site generation features. I wanted to keep the new design simple, change the theme to dark mode, add a blog, make the website mobile friendly and WCAG 2.1 compliant. 

## Killer Features

- [Content collections](https://docs.astro.build/en/guides/content-collections/) has very good DX. Type safe collection with Zod validation is the chef's kiss.
- Built-in support for [MDX](https://docs.astro.build/en/guides/integrations-guide/mdx/) to mix React components with markdown.
- [Zero JavaScript by default](https://docs.astro.build/en/basics/astro-components/) for fast, lightweight pages.
- Seamless integration with [Tailwind CSS](https://docs.astro.build/en/guides/styling/#tailwind) for utility-first styling.


## Gotchas

- [Biome.js v2 still does not fully support](https://biomejs.dev/internals/language-support/#html-super-languages-support) `*.astro` files. At the time of publishing this post, the formatter can break templates.