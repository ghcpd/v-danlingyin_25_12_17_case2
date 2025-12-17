#!/usr/bin/env bash
set -e
FILE="input.tsx"
errors=0
echo "Running UI checks on $FILE"

# 1) Fail if original placeholder color remains
if grep -n "bg-gray-300" "$FILE" > /dev/null; then
  echo "FAIL: Found legacy placeholder color 'bg-gray-300'"
  errors=$((errors+1))
fi

# 2) Ensure empty state exists
if ! grep -n "No metrics available" "$FILE" > /dev/null; then
  echo "FAIL: Missing empty state text 'No metrics available'"
  errors=$((errors+1))
fi

# 3) Ensure cards have improved separation (bg-gray-50 or cardClasses)
if ! grep -n "bg-gray-50" "$FILE" > /dev/null && ! grep -n "cardClasses" "$FILE" > /dev/null; then
  echo "FAIL: Card separation not implemented (missing 'bg-gray-50' or 'cardClasses')"
  errors=$((errors+1))
fi

# 4) Ensure button has aria-label
if ! grep -n "aria-label" "$FILE" > /dev/null; then
  echo "FAIL: Dark mode toggle missing aria-label"
  errors=$((errors+1))
fi

# 5) Ensure label/value colors are dark-mode aware
if ! grep -n "text-gray-400" "$FILE" > /dev/null && ! grep -n "text-white" "$FILE" > /dev/null; then
  echo "FAIL: Label/value color fixes not found (expected 'text-gray-400' or 'text-white')"
  errors=$((errors+1))
fi

# 6) Ensure improved focus styles present
if ! grep -n "focus:ring-2" "$FILE" > /dev/null; then
  echo "FAIL: Focus ring improvement not found (expected 'focus:ring-2')"
  errors=$((errors+1))
fi

if [ "$errors" -eq 0 ]; then
  echo "PASS: All checks passed"
  exit 0
else
  echo "FAIL: $errors check(s) failed"
  exit 2
fi
