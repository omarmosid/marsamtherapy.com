# AGENTS.md - Coding Agent Guidelines

This document provides guidelines for AI coding agents working in this repository.

## Project Overview

**Marsam Therapy** (marsamtherapy.com) - A therapy practice website for Mariya Samreen, a licensed therapist offering faith-informed therapy with Islamic principles.

### Website Content
- **Therapist**: Mariya Samreen - Psychological Counsellor with 4+ years experience
- **Services**: Conflict Management, Trauma Counselling, Psychoeducation, Individual Therapy, Life Skills Training
- **Scope**: Anxiety, Stress Management, Anger Management, Life Transitions, Abandonment, Behavioural/Emotional Problems
- **Clients**: Adults, Elderly, Individuals, Groups, Communities
- **Languages**: English, Hindi/Urdu
- **Theme**: Celestial "brightness in darkness" with tagline "Know it. Feel it. Believe it."
- **Design**: Dark green (#0a1810-#234030) with orange accent (#f97316)

### Tech Stack
- **Framework**: Astro 5.x (static site generator)
- **Styling**: Tailwind CSS v4 with custom theme
- **Fonts**: Libre Baskerville (serif, self-hosted via @fontsource), system fonts (sans-serif)
- **Icons**: Heroicons v2
- **Language**: TypeScript (strict mode)
- **Deployment**: Cloudflare Workers/Pages
- **Package Manager**: npm
- **Module System**: ES Modules (`"type": "module"`)

## Build/Lint/Test Commands

### Development

```bash
npm run dev        # Start dev server (http://localhost:4321)
npm run build      # Build to ./dist/
npm run preview    # Build and preview with Wrangler locally
npm run deploy     # Build and deploy to Cloudflare
npm run cf-typegen # Generate Cloudflare Worker types
```

### Linting & Formatting

> **Note**: No ESLint/Prettier configured yet. If adding, use `eslint-plugin-astro` and `prettier-plugin-astro`.

### Testing

> **Note**: No testing framework configured. Recommended: Vitest (unit) + Playwright (E2E).
>
> Run single tests with:
> ```bash
> npx vitest run src/path/to/file.test.ts
> npx playwright test tests/path/to/file.spec.ts
> ```

### Astro CLI

```bash
npm run astro -- check   # Type-check .astro files
npm run astro -- add     # Add integrations
npm run astro -- info    # Show environment info
```

## Project Structure

```
/
├── public/                   # Static assets (served as-is)
├── src/
│   ├── env.d.ts              # TypeScript environment declarations
│   ├── pages/                # File-based routing (*.astro, *.md)
│   ├── components/           # Reusable components
│   │   ├── shared/           # Cross-page components
│   │   │   ├── ui/           # Common UI components (Button, Input, Textarea, etc.)
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── ConstellationBg.astro
│   │   ├── home/             # Home page specific sections
│   │   └── blog/             # Blog specific components
│   ├── layouts/              # Page layouts (Layout.astro)
│   └── styles/               # Global styles (global.css with Tailwind v4 theme)
├── astro.config.mjs          # Astro configuration
├── tsconfig.json             # TypeScript config (extends astro/tsconfigs/strict)
├── wrangler.jsonc            # Cloudflare Workers configuration
└── worker-configuration.d.ts # Auto-generated Cloudflare types
```

## Code Style Guidelines

### TypeScript

- **Strict mode** enabled via `astro/tsconfigs/strict`
- Use `// @ts-check` in `.mjs` config files
- Prefer **interfaces** for object shapes, **type aliases** for unions/primitives
- Use explicit return types for exported functions
- Avoid `any` - use `unknown` with type guards

### Imports

- Order: Framework core -> Third-party -> Local modules
- Blank lines between import groups
- Named imports for utilities, default imports for packages

```typescript
// @ts-check
import { defineConfig } from 'astro/config';

import cloudflare from '@astrojs/cloudflare';

import { myLocalUtil } from './utils/helpers';
```

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Files (pages) | `kebab-case` | `about-us.astro` |
| Files (components) | `PascalCase` | `NavBar.astro` |
| Files (utilities) | `camelCase` | `formatDate.ts` |
| Interfaces/Types | `PascalCase` | `UserProfile` |
| Functions | `camelCase` | `getUserData()` |
| Constants | `SCREAMING_SNAKE_CASE` | `API_BASE_URL` |
| CSS classes | `kebab-case` | `.nav-item` |

### Astro Components

- Use Tailwind CSS classes, avoid `<style>` blocks unless absolutely necessary
- Props interface always at the top of frontmatter
- Use destructuring for props
- Use `slot` for flexible content injection (e.g., icons, custom content)
- **IMPORTANT**: Always use shared UI components from `src/components/shared/ui/` for forms and common elements

#### Available UI Components

Use these components instead of raw HTML elements:

- **Button** - Primary, secondary, outline variants with sizes
- **Input** - Text, email, tel, password inputs with labels
- **Textarea** - Multi-line text input with labels
- **Select** - Dropdown select with options
- **Checkbox** - Checkbox with label
- **Label** - Standalone label with required indicator

```astro
---
import Button from '../shared/ui/Button.astro';
import Input from '../shared/ui/Input.astro';
import Textarea from '../shared/ui/Textarea.astro';

interface Props {
	title: string;
	description: string;
}

const { title, description } = Astro.props;
---

<div class="bg-night-light border border-night-lighter rounded-lg p-6">
	<slot name="icon" />
	<h3 class="font-serif text-xl text-ivory mb-2">{title}</h3>
	<p class="text-charcoal-light">{description}</p>
</div>

<!-- Example: Use UI components for forms -->
<form>
	<Input
		type="email"
		id="email"
		name="email"
		label="Email Address"
		placeholder="your@email.com"
		required
	/>
	<Textarea
		id="message"
		name="message"
		label="Message"
		rows={5}
		required
	/>
	<Button type="submit" variant="primary" size="lg">
		Submit
	</Button>
</form>
```

### Formatting

- **Indentation**: Tabs
- **Quotes**: Single quotes for JS/TS
- **Semicolons**: Always use
- **Trailing commas**: Use in multi-line arrays/objects
- **Line length**: ~100 characters max
- **File endings**: Always end with newline

### Comments

- JSDoc-style (`/** */`) for documentation with `@param`, `@returns`, `@see`
- Single-line (`//`) for brief explanations
- Include URLs for external references

### Error Handling

- Use try/catch for async operations
- Provide meaningful error messages
- Log errors with context
- Return appropriate HTTP status codes in API routes

```typescript
try {
  const data = await fetchData();
  return new Response(JSON.stringify(data), { status: 200 });
} catch (error) {
  console.error('Failed to fetch data:', error);
  return new Response('Internal Server Error', { status: 500 });
}
```

## Cloudflare Integration

- Access runtime via `Astro.locals.runtime`
- Environment variables: Define in `wrangler.jsonc` under `vars`
- KV/D1/R2 bindings: Configure in `wrangler.jsonc`, types auto-generated
- Run `npm run cf-typegen` after modifying bindings

```astro
---
const runtime = Astro.locals.runtime;
const env = runtime.env;
const ctx = runtime.ctx;
---
```

## Important Notes

1. **File-based routing**: Files in `src/pages/` become routes automatically
2. **Static assets**: Place in `public/` - served without processing
3. **Type checking**: Run `npm run astro -- check` before committing
4. **Cloudflare types**: Regenerate with `npm run cf-typegen` after changing bindings
5. **Local preview**: Use `npm run preview` to test Cloudflare Workers locally
