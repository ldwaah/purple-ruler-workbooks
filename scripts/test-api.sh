#!/usr/bin/env bash
# Smoke-test leaderboard + submit. Usage: ./scripts/test-api.sh [baseUrl]
set -euo pipefail

BASE="${1:-http://localhost:3000}"
TOKEN="student-alex-token"
LESSON="english.y10.l01-03"

echo "Testing $BASE (token=$TOKEN)"

LB=$(curl -sS "$BASE/api/leaderboard?token=$TOKEN")
echo "Leaderboard: $LB"
echo "$LB" | grep -q '"dbMode"' || { echo "Invalid leaderboard response"; exit 1; }

SUB=$(curl -sS -X POST "$BASE/api/submissions" \
  -H "Content-Type: application/json" \
  -d "{\"lessonId\":\"$LESSON\",\"responses\":{\"q1\":\"test\"},\"studentToken\":\"$TOKEN\"}")
echo "Submit: $SUB"
echo "$SUB" | grep -q '"ok":true' || { echo "Submit failed"; exit 1; }

LB2=$(curl -sS "$BASE/api/leaderboard?token=$TOKEN")
echo "Leaderboard after submit: $LB2"
echo "OK"
