# Citely

Know if AI will cite you before you hit publish.

## Stack

- **Next.js 16.2.11** (App Router, Turbopack, React 19.2)
- **TypeScript**
- **Tailwind CSS v4** (CSS-native `@theme`, no `tailwind.config.ts`)
- **shadcn/ui** (`new-york` style, Tailwind v4 + React 19 ready)
- **Inter** (headings + body, via `next/font/google`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and fill in real values. `.env.local` is
gitignored — never commit real secrets.

```bash
cp .env.example .env.local
```

## Adding shadcn components

```bash
npx shadcn@latest add button
```

Components from Shadcn are copied into `src/components/ui/` — you own the code.

## Design tokens

Color tokens (Citation Blue palette + semantic scorer states) live in
`src/app/globals.css` under `:root`, `.dark`, and `@theme inline`. No JS
config file — Tailwind v4 generates utility classes directly from these CSS
variables.
