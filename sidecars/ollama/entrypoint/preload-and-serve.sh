#!/usr/bin/env bash
set -euo pipefail

MODEL_FILE="/etc/ollama/preload-models.txt"

MODEL_CACHE_DIR="${OLLAMA_MODEL_CACHE_DIR:-/ollama/data}"
OLLAMA_DATA_DIR="${OLLAMA_DATA_DIR:-/root/.ollama}"

prepare_model_volume() {
  mkdir -p "$MODEL_CACHE_DIR"
  if [ "$MODEL_CACHE_DIR" != "$OLLAMA_DATA_DIR" ]; then
    rm -rf "$OLLAMA_DATA_DIR"
    ln -sfn "$MODEL_CACHE_DIR" "$OLLAMA_DATA_DIR"
  fi
  export OLLAMA_DATA_DIR="$MODEL_CACHE_DIR"
}

default_model_list() {
  if [ ! -f "$MODEL_FILE" ]; then
    return
  fi
  grep -E '^[^#[:space:]]' "$MODEL_FILE" | tr '\n' ',' | sed 's/,$//'
}

MODELS_VALUE="$(default_model_list)"
MODELS="${OLLAMA_PRELOAD_MODELS:-$MODELS_VALUE}"

OLLAMA_CLIENT_URL="${OLLAMA_URL:-http://127.0.0.1:11434}"
export OLLAMA_URL="$OLLAMA_CLIENT_URL"

start_ollama_server() {
  ollama "$@" &
  OLLAMA_PID=$!
  trap 'kill "$OLLAMA_PID" >/dev/null 2>&1' EXIT
}

wait_for_ollama() {
  local attempts=0
  until ollama ls >/dev/null 2>&1; do
    attempts=$((attempts + 1))
    if [ "$attempts" -ge 30 ]; then
      printf 'error: Ollama server did not become healthy\n' >&2
      return 1
    fi
    sleep 1
  done
}

pull_models() {
  printf 'Pulling Ollama models: %s\n' "$MODELS"
  printf '%s\n' "$MODELS" | tr ',' '\n' | while read -r raw_model; do
    model="$(printf '%s' "$raw_model" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//')"
    if [ -z "$model" ]; then
      continue
    fi
    printf 'Pulling %s\n' "$model"
    if ! ollama pull "$model"; then
      printf 'warning: unable to pull %s\n' "$model" >&2
    fi
  done
}

if [ $# -eq 0 ]; then
  set -- serve
fi

prepare_model_volume

start_ollama_server "$@"
if ! wait_for_ollama; then
  kill "$OLLAMA_PID" >/dev/null 2>&1 || true
  exit 1
fi

if [ -n "$MODELS" ]; then
  export OLLAMA_URL="$OLLAMA_CLIENT_URL"
  pull_models
fi

wait "$OLLAMA_PID"
