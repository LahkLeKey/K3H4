<img width="3800" height="1800" alt="image" src="https://github.com/user-attachments/assets/28182ae9-0bf7-4b93-8eb9-b73e24a85686" />

# K3H4 Monorepo

Bun/TypeScript workspace with a React/Three.js frontend and a Fastify + Prisma API backend. Docker compose is available for local stack spins.

## Structure
- apps/www.k3h4.io – Bun + React + R3F frontend
  - <img width="1800" height="1800" alt="image" src="https://github.com/user-attachments/assets/24434017-62b8-4803-87a6-f4137b8b14e0" />

- apps/api.k3h4.io – Fastify API with Prisma/Postgres
- scripts/ – shared scripts and tooling
- sidecars/ollama – Ollama-based LLM sidecar for `api.k3h4.io` (Docker Compose + Fly)

## Requirements
- Bun (for both apps)
- Docker + Docker Compose (for local Postgres and API via compose)
- Node-compatible toolchain (for editor/TS)

## Environment
- Frontend: `apps/www.k3h4.io/.env` with `API_URL`, `GITHUB_CLIENT_ID`, `LINKEDIN_CLIENT_ID`
- Backend: `apps/api.k3h4.io/.env` with `DATABASE_URL`, `GITHUB_CLIENT_ID/SECRET`, `LINKEDIN_CLIENT_ID/SECRET`, `JWT_SECRET`, `CORS_ORIGIN`

## Quick Start
1) Install deps
```
bun install
```
2) Run via Docker Compose (API + DB)
```
docker compose up --build
```
3) Start frontend (from repo root)
```
cd apps/www.k3h4.io
bun run dev
```
API docs available at `${API_URL}/docs`.

## LLM sidecar

- `docker compose up --build` now also brings up `sidecars/ollama`. The Fastify server hits `OLLAMA_URL=http://ollama:11434`, so the stacking works locally without extra networking.
- Docker Compose now binds the host-side `./sidecars/ollama/data` directory so the mount exists automatically and caches the models that the entrypoint pulls from `sidecars/ollama/preload-models.txt`.
- Production deploys the sidecar as its own Fly app (`api-k3h4-io-ollama`) using the configuration in `sidecars/ollama/fly.toml`, which currently targets a shared-cpu-1x slice with 2 GB of RAM.
- Point the API app at `http://api-k3h4-io-ollama.internal:11434` (e.g. via `fly secrets set OLLAMA_URL=...`) to reach the sidecar over Fly’s internal network.

## Useful Tasks (VS Code)
- compose:up / compose:down – bring stack up/down
- bun:dev (frontend) – run web dev server

## Notes
- OAuth callbacks expected at `http://localhost:5173/auth/callback/{provider}`.
- API exposes `/auth/{provider}/url` and `/auth/{provider}/callback` for GitHub/LinkedIn.
- Prisma schema is under `apps/api.k3h4.io/prisma/`; migrations tracked there.
