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
- Before deploying, create or attach a persistent Fly volume (the config now mounts `ollama_models` at `/ollama/data`) so the entrypoint can cache downloads in `OLLAMA_MODEL_CACHE_DIR` and new machines reuse the artifacts instead of pulling 5 GB each boot. For example, run `fly volumes create ollama_models --size 8 --region iad --app api-k3h4-io-ollama` and keep the same name in `fly.toml`’s `[[mounts]]` so every machine attaches to the shared cache.
- The Fly config now allows the Ollama app to scale down to zero (`min_machines_running = 0`, `auto_stop_machines = true`) so you only pay for warm machines when there’s demand; the `auto_start_machines = true` flag will bring machines up automatically when traffic arrives.

## Preloading models

- The sidecar image now wraps `ollama` with a tiny entrypoint script that pulls the models listed in `sidecars/ollama/preload-models.txt` before starting the HTTP server. The default file now seeds `llama3.2:1b` (≈1.3 GB), which is a light enough working set to fit on the shared-cpu-1x slice, and the script is idempotent because `ollama pull` is a no-op when a model is already downloaded.
- If you prefer an even smaller footprint, point `OLLAMA_PRELOAD_MODELS` or `preload-models.txt` at a quantized tag such as `llama3.2:1b-q4_0` or `llama3.2:1b-q3` to shave the download closer to 600 MB. That same override is the place to bring back any heavier models when you later scale to beefier VMs.

## Scaling notes

- The Fly VM is intentionally sized to 2 GB of RAM on a `shared-cpu-1x` slice. Increase `memory` here if usage grows (e.g., bump to 4 GB for heavier models).
- Docker Compose uses the same port defaults, so you can test the production sizing by starting the stack locally and hitting `http://localhost:11434`.
