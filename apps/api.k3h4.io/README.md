# api.k3h4.io

Fastify-based API service with Swagger UI.

## Scripts

- `bun run dev` — start in watch mode on `http://localhost:3001`
- `bun run start` — start once in production mode

## Swagger UI

Available at `/docs` when the server is running.

## Health check

`GET /health` returns `{ "status": "ok" }`.
