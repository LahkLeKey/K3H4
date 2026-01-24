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
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET` — GitHub OAuth app credentials
- `LINKEDIN_CLIENT_ID` / `LINKEDIN_CLIENT_SECRET` — LinkedIn OAuth app credentials

### OAuth app setup (manual tokens)

GitHub (Production & Local):
- Create a GitHub OAuth App → set Authorization callback to your frontend page that captures the `code`, e.g. `http://localhost:5173/auth/github` (for Fly: `https://www.k3h4.io/auth/github`).
- Save `Client ID` and `Client Secret` into `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`.
- Scopes: `read:user`, `user:email` (email is optional but helpful).

LinkedIn:
- Create a "Client application" → Auth tab → add redirect URI matching your frontend code catcher, e.g. `http://localhost:5173/auth/linkedin` (for Fly: `https://www.k3h4.io/auth/linkedin`).
- Product: Sign In with LinkedIn using OpenID Connect; scopes: `openid email profile`.
- Save `Client ID` and `Client Secret` into `LINKEDIN_CLIENT_ID` / `LINKEDIN_CLIENT_SECRET`.

Backend exchange endpoints (what the frontend should call after it receives the OAuth `code`):
- `POST /auth/github/callback` with JSON `{ "code": "<code>", "redirectUri": "<same redirect you registered>" }`
- `POST /auth/linkedin/callback` with JSON `{ "code": "<code>", "redirectUri": "<same redirect you registered>" }`

Response shape (both providers):
```json
{ "accessToken": "...", "refreshToken": "...", "expiresAt": "2025-01-23T...Z" }
```

Access tokens expire in 15m; refresh tokens expire in 30d and are persisted in `RefreshToken`. Provide the refresh token to the client for future refresh flows.

## Fly.io deploy

Prereqs: `fly auth login`, `flyctl` installed.

Deploy steps:

1. `cd apps/api.k3h4.io`
2. `fly deploy --remote-only --app api-k3h4-io`
3. Attach domain: `fly certs add api.k3h4.dev --app api-k3h4-io` and point DNS (CNAME) to `api-k3h4-io.fly.dev`.

## LLM sidecar

- The repo now includes `sidecars/ollama`, which runs the official `ollama/ollama:latest` image as a sidecar for `api.k3h4.io`.
- Docker Compose brings the sidecar up automatically and exposes it at `http://localhost:11434`. The Fastify server reads `OLLAMA_URL` (default `http://ollama:11434`) so you can exercise `/api/chat` locally without extra networking.
- For Fly, deploy the sidecar app with `fly deploy --config sidecars/ollama/fly.toml --app api-k3h4-io-ollama`. The configuration currently targets a shared-cpu-1x slice with 2 GB of RAM.
- Before deploying or running `fly secrets set`, point the API app to the sidecar over Fly’s internal network: `fly secrets set OLLAMA_URL=http://api-k3h4-io-ollama.internal:11434` (replace the host if you rename the sidecar app).
- Chat uses the `llama2` model bundled with the Ollama sidecar; tweak temperature and context depth via `OLLAMA_CHAT_TEMPERATURE` and `OLLAMA_CHAT_HISTORY_LIMIT` (defaults: `0.2`, `32`).

### Chat API

- The API now exposes `/chat/sessions` and `/chat/sessions/:id/messages` to persist conversation history and proxy user prompts through the Ollama sidecar.
- You must still set `OLLAMA_URL` so the proxy can reach the sidecar, but the chat-specific env vars above let you fine-tune temperature and context depth without rebuilding the app.
