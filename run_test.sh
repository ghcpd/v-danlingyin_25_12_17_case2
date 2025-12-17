#!/usr/bin/env bash
set -euo pipefail
FILE="input.tsx"
ERRORS=0

check() {
  grep -n -E "$1" "$FILE" >/dev/null 2>&1 || { echo "FAIL: $2"; ERRORS=$((ERRORS+1)); }
}

check 'role="main"' 'missing role="main" on root container'
check 'sr-only' 'missing sr-only loading message for screen readers'
check 'No metrics available' 'missing empty state message for no metrics'
check 'm.label.*m.value' 'missing composite key using label and value'
check 'aria-live' 'missing aria-live on loading status'
check 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3' 'missing responsive grid classes'

if [ "$ERRORS" -ne 0 ]; then
  echo "FINAL: FAIL - $ERRORS issue(s) found"
  exit 1
else
  echo "FINAL: PASS - All checks passed"
  exit 0
fi
