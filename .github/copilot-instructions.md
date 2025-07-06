# copilot-instructions.md

## Guidelines for Astro Components


- Use `.astro` for layouts and pages, `.tsx` for interactive widgets.
- Import content from `src/content` using Astro Content Collections.
- Reuse widget components from `src/components`.
- Place utility functions in [`src/lib/utils.ts`](../src/lib/utils.ts).
- Follow WCAG 2.1 AS standard for accessibility.
- Do not suggest using `tailwind.config.js` but instead use the existing Tailwind CSS classes in `src/styles/global.css`.
- Always add the line number and the filename when you reference code.
- Prefer composition and reuse of components.
- Do not create any custom classes in Tailwind CSS.
- Use Astro's routing and layout features.
- Leverage ShadCN components for dynamic UI elements.
- Use Playwright for accessibility testing as defined in `tests/a11y.spec.ts`.
- Use `src/constants.mjs` for site metadata and navigation links.