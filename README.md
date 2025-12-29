# K3H4 Monorepo

Public monorepo for the K3H4 platform: Fastify + Prisma API and a React (Bun + Vite) web app.

## Projects
- apps/api.k3h4.io — Fastify API with Prisma, JWT auth, and feature routes (auth, bank, freight, agriculture, culinary, POS, warehouse, personas).
- apps/www.k3h4.io — React SPA built with Bun, Vite, TanStack Query, Radix UI, Tailwind.

## Prerequisites
- Bun 1.3.x (repo scripts assume Bun)
- Docker (optional) if you run docker-compose services

## Quick Start
```bash
# install
bun install

# API dev
cd apps/api.k3h4.io
bun install
bun run dev

# Web dev
cd ../www.k3h4.io
bun install
bun run dev
```

## Testing
```bash
# API tests
cd apps/api.k3h4.io
bun run test

# Web tests
cd apps/www.k3h4.io
bun run test

# Web coverage
bun run test --coverage
```

## Database (API)
- Prisma schema: apps/api.k3h4.io/prisma/schema.prisma
- Generate client: bun run prisma:generate
- Migrate (dev): bun run prisma:migrate

## Docker
- docker-compose at repo root (optional helpers)
- Up: docker compose up --build

## Deployment
- Web: Vercel (build runs `bun run build` -> `tsc -b && bun run scripts/build.ts`)
- API: containerized (see apps/api.k3h4.io/Dockerfile)

## Notes
- TypeScript strict in both apps.
- Vitest + Testing Library for tests.
- Radix UI + Tailwind for UI primitives.
