# AGENTS.md - hireloop-client

This is a Next.js 16+ app (app router) with better-auth, Tailwind CSS v4, and shadcn/ui components.

## Quick commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at http://localhost:3000 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |
| `npm run typecheck` | Run TypeScript type check (`tsc --noEmit`) |

## Project structure

- `app/` — Next.js app router pages and API routes
- `components/` — React components (ui/, hero, navbar, etc.)
- `lib/` — Utilities: `auth-client.ts`, `auth.ts`, `utils.ts`
- `env` vars in `.env` (see `.env` file for required vars: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGO_DB_URI`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_BETTER_AUTH_URL`)

## Key conventions

- **Auth**: `authClient` from `lib/auth-client` provides `signIn`, `signUp`, `useSession`, `signOut`. Uses better-auth with MongoDB adapter + Google OAuth. Protected routes check `session?.user`.
- **Tailwind CSS v4**: `@import "tailwindcss"` in `app/globals.css`. Config in `package.json` devDependencies. `cn` utility from `cn` package for class merging.
- **Fonts**: Google Fonts via `next/font` (Geist, Manrope, Space_Mono). Font classes applied in `app/layout.tsx`.
- **Theme**: `ThemeProvider` in `components/theme-provider` enables system theme + ⌘D hotkey to toggle.
- **API routes**: under `app/api/` — authenticated routes use `better-auth` middleware/context.
- **Env**: Required vars listed in `.env`. `NEXT_PUBLIC_BETTER_AUTH_URL` must match `BETTER_AUTH_URL`.

## Workflow

1. `npm run typecheck` → `npm run lint` → `npm run build` (fix order)
2. Add shadcn component: `npx shadcn@latest add <component>`
3. Run `npm run format` after edits
4. Test: `npm run dev` and verify auth flows work with valid `.env`

## Gotchas

- `better-auth` requires MongoDB — local dev needs MongoDB accessible via `MONGO_DB_URI`
- `NEXT_PUBLIC_BETTER_AUTH_URL` must match the running server URL (default `http://localhost:3000`)
- Google OAuth requires `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`
- Tailwind CSS v4 uses `@import` style — do not use legacy `tailwind.config.js` patterns
- `cn()` merges Tailwind classes (from `cn` package); always use it for variant/size classes