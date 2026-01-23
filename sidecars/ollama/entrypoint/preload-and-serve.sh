#!/usr/bin/env sh
set -euo pipefail

MODEL_FILE="/etc/ollama/preload-models.txt"

default_model_list() {
  if [ ! -f "$MODEL_FILE" ]; then
    return
  fi
  grep -E '^[^#[:space:]]' "$MODEL_FILE" | tr '\n' ',' | sed 's/,$//'
}

MODELS_VALUE="$(default_model_list)"
MODELS="${OLLAMA_PRELOAD_MODELS:-$MODELS_VALUE}"

if [ -n "$MODELS" ]; then
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
fi

exec ollama "$@"
