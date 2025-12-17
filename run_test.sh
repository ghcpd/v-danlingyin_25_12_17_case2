#!/usr/bin/env bash
set -e
FILE="input.tsx"
FAILED=0
echo "Running UI validation tests against $FILE"

# 1) Ensure old buggy label class isn't present (should be conditional now)
if grep -n "text-sm text-gray-500 mb-2" "$FILE" >/dev/null; then
  echo "[FAIL] Found non-conditional label class 'text-sm text-gray-500 mb-2' (should adapt to dark mode)"
  FAILED=1
else
  echo "[OK] Label class is conditional or updated"
fi

# 2) Ensure key isn't just the label
if grep -n "key={m.label}" "$FILE" >/dev/null; then
  echo "[FAIL] Found key={m.label} (possible collisions)."
  FAILED=1
else
  echo "[OK] Keys are not simple label (unique/enhanced)."
fi

# 3) Ensure localStorage usage exists (persistence of dark mode)
if ! grep -n "localStorage" "$FILE" >/dev/null; then
  echo "[FAIL] localStorage usage not found (dark mode persistence missing)."
  FAILED=1
else
  echo "[OK] localStorage usage found."
fi

# 4) Ensure there's an empty-state message
if ! grep -n "No metrics available" "$FILE" >/dev/null; then
  echo "[FAIL] Missing empty-state message 'No metrics available'."
  FAILED=1
else
  echo "[OK] Empty-state message present."
fi

# 5) Ensure light-mode border color and focus ring improvements present
if ! grep -n "border-gray-200" "$FILE" >/dev/null; then
  echo "[FAIL] border-gray-200 not found (light-mode borders may be missing)."
  FAILED=1
else
  echo "[OK] border-gray-200 present."
fi

if ! grep -n "focus:ring-2" "$FILE" >/dev/null; then
  echo "[FAIL] focus:ring-2 not found (improved focus styles missing)."
  FAILED=1
else
  echo "[OK] focus:ring-2 present."
fi

if [ "$FAILED" -ne 0 ]; then
  echo "\nRESULT: FAIL"
  exit 1
else
  echo "\nRESULT: PASS"
  exit 0
fi
