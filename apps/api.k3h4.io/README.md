# api.k3h4.dev

Fastify-based API service with Swagger UI.

## Scripts

- `bun run dev` — start in watch mode on `http://localhost:3001`
- `bun run start` — start once in production mode
- `bun run prisma:generate` — regenerate Prisma client
- `bun run prisma:migrate` — create/apply migrations (interactive; requires DATABASE_URL)

## Swagger UI

Available at `/docs` when the server is running.

## Health check

`GET /health` returns `{ "status": "ok" }`.

## Env

Copy `.env.example` to `.env` and set values:
- `DATABASE_URL` — direct PostgreSQL connection string (required for Prisma adapter at runtime)
- `JWT_SECRET` — signing key for access tokens

## Fly.io deploy

Prereqs: `fly auth login`, `flyctl` installed.

Deploy steps:

1. `cd apps/api.k3h4.io`
2. `fly deploy --remote-only --app api-k3h4-io`
3. Attach domain: `fly certs add api.k3h4.dev --app api-k3h4-io` and point DNS (CNAME) to `api-k3h4-io.fly.dev`.
