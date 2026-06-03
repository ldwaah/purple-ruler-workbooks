#!/usr/bin/env bash
# Push Supabase vars from .env.local to Vercel (non-interactive).
# Usage: ./scripts/sync-vercel-env.sh [production|preview|development]
set -euo pipefail

ENV_TARGET="${1:-production}"
ENV_FILE=".env.local"

if [[ ! -f "$ENV_FILE" ]]; then
  echo "No $ENV_FILE — create from .env.example first."
  exit 1
fi

VARS=(
  NEXT_PUBLIC_SUPABASE_URL
  NEXT_PUBLIC_SUPABASE_ANON_KEY
  SUPABASE_SERVICE_ROLE_KEY
)

for name in "${VARS[@]}"; do
  value=$(grep -E "^${name}=" "$ENV_FILE" | head -1 | cut -d= -f2- | sed 's/^["'\'']//;s/["'\'']$//')
  if [[ -z "${value:-}" || "$value" == *"YOUR_"* || "$value" == *"your_"* ]]; then
    echo "Skip $name (empty or placeholder)"
    continue
  fi
  if vercel env ls "$ENV_TARGET" 2>/dev/null | grep -q "^ ${name} "; then
    echo "Already set: $name ($ENV_TARGET)"
    continue
  fi
  printf '%s' "$value" | vercel env add "$name" "$ENV_TARGET" --force
  echo "Added: $name → $ENV_TARGET"
done

echo "Done. Redeploy: vercel --prod"
