# api.k3h4.dev

Fastify-based API service with Swagger UI.

## Scripts

- `bun run dev` — start in watch mode on `http://localhost:3001`
- `bun run start` — start once in production mode

## Swagger UI

Available at `/docs` when the server is running.

## Health check

`GET /health` returns `{ "status": "ok" }`.

## Fly.io deploy

Prereqs: `fly auth login`, `flyctl` installed.

Deploy steps:

1. `cd apps/api.k3h4.io`
2. `fly deploy --remote-only --app api-k3h4-io`
3. Attach domain: `fly certs add api.k3h4.dev --app api-k3h4-io` and point DNS (CNAME) to `api-k3h4-io.fly.dev`.
