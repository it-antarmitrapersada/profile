# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

Package manager is **bun** (`packageManager: bun@1.3.14`).

```bash
bun dev                       # next dev
bun run build                 # next build
bun run lint                  # eslint (flat config, eslint.config.mjs)
bun run test                  # vitest watch
bunx vitest run <file>        # single test file
bunx vitest run -t "<name>"   # single test by name — tests live in src/tests/, no vitest config file

bun --bun run prisma generate # regenerate client into src/lib/generated/prisma (gitignored — required after clone)
bun --bun run prisma db pull  # re-introspect the live DB into prisma/schema.prisma
```

Prisma commands must be run with `bun --bun` — `prisma.config.ts` loads `dotenv/config` and assumes it.

## Architecture

Next.js 16 App Router + React 19, Tailwind v4, TypeScript strict, `@/*` → `src/*`.

**Two database paths, one Postgres.** The database is a Supabase project, reached two ways:

- **Prisma** (`src/lib/prisma.ts`) — direct SQL over `DATABASE_URL` via the `@prisma/adapter-pg` driver adapter (Prisma 7 requires an adapter; no `PRISMA_*` engine URLs). Default export is a singleton cached on `globalThis` outside production to survive dev HMR. Use for data access.
- **Supabase JS** (`src/lib/supabase/*`) — used for **auth/session only**, over the public URL + publishable key. Three clients, do not mix them up: `client.ts` (browser), `server.ts` (Server Components / Route Handlers, wraps `next/headers` cookies), `proxy.ts` (request-level session refresh).

**The schema is introspected, not authored.** `prisma/schema.prisma` is 85 models pulled from an existing production database — Supabase's `auth` schema plus a `public` schema of `pg_*` tables (Indonesian ERP domain: `penjualan` = sales, `pembelian` = purchase, `stok` = stock, `outlet`, `pengiriman` = delivery). There is no `prisma/migrations/` directory. Change the database first, then `prisma db pull` — do not hand-edit models and do not run `prisma migrate dev` against this database without confirming with the user; it targets a live production schema. Many tables carry RLS and database comments (flagged by `///` comments in the schema).

**Auth gate.** `src/proxy.ts` is the Next 16 proxy (formerly middleware — same role, new filename/export). It runs `updateSession` on every non-static request, which calls `supabase.auth.getClaims()` and **redirects any unauthenticated request to `/login`** unless the path starts with `/login` or `/auth`. `/login` exists (`src/app/(auth)/login/page.tsx`); `/auth` does not — any new public route must be added to that allowlist in `src/lib/supabase/proxy.ts` or it will redirect-loop. Never insert code between `createServerClient` and `getClaims()` there, and return the `supabaseResponse` object unmodified (cookie sync).

**Feature modules.** Domain code lives in `src/modules/<domain>/`, not in `app/`. Pages are thin and import from a module. The layering, per `src/modules/auth/`:

- `<domain>.dto.ts` — zod schemas + inferred types shared by the whole module.
- `<feature>/<feature>.service.ts` — plain async function; talks to Supabase or Prisma, throws `Error(error.message)` on failure. No `"use server"`.
- `<feature>/<feature>.action.ts` — `"use server"`; takes `unknown`, `safeParse`s it with the DTO, calls the service, then `redirect()`s. Validation happens here, never in the service.
- `hooks/use-*.ts` — `"use client"`; TanStack Query `useMutation` wrapping the action.
- `components/` — the module's client components.

Server Actions are called directly as the `mutationFn` — there are no API route handlers. `TanstackQueryProvider` (`src/components/providers/`) wraps the app in the root layout with a 5-minute default `staleTime`.

**UI.** shadcn/ui with the `base-luma` style on top of `@base-ui/react` (not Radix), icons from `lucide-react` (per `components.json`), theme tokens in `src/app/globals.css` via `@theme inline`. Add components with `bunx shadcn@latest add <name>` so `components.json` aliases apply.

## Environment

`.env` (gitignored) needs `DATABASE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
