# robmcguinness.com

## Project Overview

This is a personal website built with [Astro](https://astro.build/) for static site generation, [TypeScript](https://www.typescriptlang.org/) for utilities, and [MDX](https://mdxjs.com/) for content. The site tries to adhere to WCAG 2.1 AA accessibility standards.

## Project Structure

```
src/
  components/         # Astro and TSX components (widgets in widgets/)
  content/            # Blog posts (MDX) and job entries (JSON/MDX)
  layouts/            # Astro layouts for pages and blog
  lib/                # Utility functions (utils.ts)
  pages/              # Astro pages and dynamic routes
  styles/             # Global styles (Tailwind CSS)
public/               # Static assets (images, favicon)
```

## Technologies Used

- [Astro](https://astro.build/) (static site generator)
- [TypeScript](https://www.typescriptlang.org/) (utilities, type safety)
- [MDX](https://mdxjs.com/) (content authoring)
- [Tailwind CSS](https://tailwindcss.com/) v4 (utility-first styling, see `src/styles/global.css`)
- [ShadCN UI](https://ui.shadcn.com/) (component styling)
- [Playwright](https://playwright.dev/) (testing, accessibility)

## Content & Components

- Blog posts: `src/content/blog/`
- Components: `src/components/`
- Utilities: `src/lib/utils.ts`
- Site Metadata: `src/constants.mjs`

## Accessibility & Best Practices

- Follows WCAG 2.1 AS accessibility standards
- Uses Astro Content Collections for content
- Styles are managed in `src/styles/global.css` (no custom Tailwind config)
- Follows composition and reuse of components
- Accessibility testing is performed using Playwright (`tests/a11y.spec.ts`)

## Development Commands

All commands use `pnpm` as the package manager:

- `pnpm install` - Install dependencies
- `pnpm run dev` - Start development server at `localhost:4321` with auto-open
- `pnpm run build` - Build for production to `./dist/`
- `pnpm run preview` - Build and preview locally at `localhost:3000`
- `pnpm run lint` - Run Biome linter
- `pnpm run lint:fix` - Run Biome with auto-fix
- `pnpm run format` - Format code with Biome
- `pnpm run lint:a11y:local` - Run accessibility tests with Playwright
