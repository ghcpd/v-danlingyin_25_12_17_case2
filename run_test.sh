#!/usr/bin/env bash
set -e

FILE=input.tsx
PASS=true

function fail { echo "FAIL: $1"; PASS=false; }

# Check Dark Mode classes are applied
grep -q "bg-gray-900" "$FILE" || fail "bg-gray-900 class not found"
grep -q "text-white" "$FILE" || fail "text-white class not found"

# Check isLoading state is declared and used
grep -q "const \[isLoading, setIsLoading\]" "$FILE" || fail "isLoading state not found"

# Check setTimeout and clearTimeout in useEffect
grep -q "setTimeout(" "$FILE" || fail "setTimeout missing"
grep -q "clearTimeout(" "$FILE" || fail "clearTimeout missing"

# Check loading indicator
grep -q "Loading metrics" "$FILE" || fail "Loading indicator missing"

# Check responsive grid classes
grep -q "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" "$FILE" || fail "Responsive grid classes missing"

# Check button accessibility and label text
grep -q "aria-pressed={darkMode}" "$FILE" || fail "aria-pressed attribute missing on button"
grep -q "type=\"button\"" "$FILE" || fail "type=\"button\" attribute missing on button"
grep -q "Switch to Dark Mode" "$FILE" || fail "Dark mode toggle text missing"
grep -q "Switch to Light Mode" "$FILE" || fail "Light mode toggle text missing"

# Check role attributes
grep -q "role=\"list\"" "$FILE" || fail "role=\"list\" missing on container"
grep -q "role=\"listitem\"" "$FILE" || fail "role=\"listitem\" missing on items"

# Check Intl.NumberFormat usage
grep -q "Intl.NumberFormat" "$FILE" || fail "Intl.NumberFormat formatting missing"

# Ensure no leftover w-screen class
grep -q "w-screen" "$FILE" && fail "w-screen class should be replaced with w-full"

if $PASS; then
  echo "PASS"
else
  exit 1
fi
