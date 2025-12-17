#!/bin/bash

file="input.tsx"

if grep -q "className=\"w-screen h-screen bg-white text-black p-4\"" "$file"; then
    echo "FAIL: Hardcoded colors found"
    exit 1
fi

if ! grep -q "loading" "$file"; then
    echo "FAIL: Loading state missing"
    exit 1
fi

if ! grep -q "grid-cols-1 md:grid-cols-3" "$file"; then
    echo "FAIL: Responsive grid missing"
    exit 1
fi

echo "PASS"
exit 0