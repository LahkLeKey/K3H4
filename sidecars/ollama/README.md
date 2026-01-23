# Ollama sidecar for api.k3h4.io

This folder packages the Ollama HTTP server that runs alongside `api.k3h4.io` in both development and production. The Fastify backend communicates with the Ollama `/api/chat` endpoint via `OLLAMA_URL`, so the service acts as an LLM sidecar rather than an externally-exposed API.

## Development (Docker Compose)

- `docker compose up --build` now brings up `ollama` in addition to the API, Postgres, and frontend.
- `api` already depends on `ollama`, and the compose service sets `OLLAMA_URL=http://ollama:11434`. Keep the `sidecars/ollama/data` volume mounted so downloaded models survive container restarts.
- If you need to inspect the LLM service from your host, it is published on `localhost:11434`.

## Production (Fly.io)

- The sidecar runs as its own Fly app named `api-k3h4-io-ollama`. The configuration in this folder pins the official `ollama/ollama:latest` image and keeps a shared vCPU at ~2 GB of RAM.
- Deploy with `fly deploy --config sidecars/ollama/fly.toml --app api-k3h4-io-ollama`. The Fly config relies on the image’s default `ollama serve` entrypoint while the env var `OLLAMA_HTTP_PORT=11434` keeps the HTTP service on the expected port, so Fastify can reach the sidecar at `http://api-k3h4-io-ollama.internal:11434`.
- The API app should set `OLLAMA_URL=http://api-k3h4-io-ollama.internal:11434` (e.g. via `fly secrets set OLLAMA_URL=...` or your preferred vault) so requests route through the sidecar.

## Preloading models

- The sidecar image now wraps `ollama` with a tiny entrypoint script that pulls the models listed in `sidecars/ollama/preload-models.txt` before starting the HTTP server. The default file seeds `llama2`, `llama3`, and `llama3.1`, and the script is idempotent because `ollama pull` is a no-op when a model is already downloaded.
- If you need a different curated set, either edit `preload-models.txt` (one model per line) or override the comma-separated environment variable `OLLAMA_PRELOAD_MODELS` (e.g. `OLLAMA_PRELOAD_MODELS="llama2,llama3.1"`) so the entrypoint pulls exactly what you want on boot.

## Scaling notes

- The Fly VM is intentionally sized to 2 GB of RAM on a `shared-cpu-1x` slice. Increase `memory` here if usage grows (e.g., bump to 4 GB for heavier models).
- Docker Compose uses the same port defaults, so you can test the production sizing by starting the stack locally and hitting `http://localhost:11434`.
