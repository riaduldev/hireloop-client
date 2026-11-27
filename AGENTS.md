# AGENTS.md - hireloop-client

This is a Next.js 16 app (app router) with better-auth, Tailwind CSS v4, and shadcn/ui.

## Quick commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server at http://localhost:3000 |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier (`**/*.{ts,tsx}`) |
| `npm run typecheck` | Run TypeScript check (`tsc --noEmit`) |

## Project structure

- `app/` — Next.js app router pages and API routes
- `components/` — React components (ui/, navbar, theme-provider, etc.)
- `lib/` — Utilities: `auth-client.ts`, `auth.ts`, `utils.ts`
- `.env` — Required vars: `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `MONGO_DB_URI`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_BETTER_AUTH_URL`

## Key conventions

- **Auth**: `authClient` from `lib/auth-client` provides `signIn`, `signUp`, `useSession`, `signOut`. better-auth with MongoDB adapter + Google OAuth. Protected routes check `session?.user`.
- **Tailwind CSS v4**: `@import "tailwindcss"` in `app/globals.css`. No legacy `tailwind.config.js` — config lives in `package.json` devDependencies.
- **Theme**: `ThemeProvider` in `components/theme-provider` enables system theme with ⌘D / Ctrl+D hotkey to toggle.
- **cn()**: Merges Tailwind classes from the `cn` package. Always use for variant/size classes.
- **Fonts**: Geist/Manrope/Space_Mono loaded via `next/font/google` in `app/layout.tsx`.

## Workflow

1. `npm run typecheck` → `npm run lint` → `npm run build` (fix errors in this order)
2. Add shadcn component: `npx shadcn@latest add <component>`
3. Run `npm run format` after edits
4. Verify auth flows with valid `.env`

## Responsive design

- The app uses **Tailwind CSS v4** with responsive breakpoints (`sm`, `lg`, `xl`).
- Most layout containers use `max-w-full` instead of fixed pixel widths, allowing
  Tailwind's responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`) to work
  naturally. Avoid fixed `max-w-[1200px]` / `max-w-[1320px]` unless paired with a
  specific narrow content width.
- The `min-h-screen` utility is preferred over `min-h-[calc(100vh-80px)]` for full-
  page heights, because viewport units can cause layout shifts on mobile when the
  address bar hides/shows.
- The `sm:px-6 lg:px-10 xl:px-12` padding pattern is used consistently for section
  inner spacing.
- The `Sidebar` component from `components/ui/sidebar` handles mobile/offcanvas
  automatically via the `useIsMobile` hook — no custom mobile sidebar logic is needed.

## Gotchas

- `better-auth` requires MongoDB — local dev needs `MONGO_DB_URI` in `.env`
- `NEXT_PUBLIC_BETTER_AUTH_URL` must match `BETTER_AUTH_URL` in `.env`
- Google OAuth requires `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`
- Tailwind CSS v4 uses `@import` style — do not use legacy `tailwind.config.js` patterns