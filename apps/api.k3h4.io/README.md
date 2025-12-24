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
