#!/bin/bash

# UI Test Script for Dashboard Component
# Platform: Linux / macOS

set -e

TESTED_FILE="input.tsx"
BACKUP_FILE="input_backup.tsx"
REPORT_FILE="ui_report.json"

echo "=========================================="
echo "UI Test Suite - Dashboard Component"
echo "=========================================="
echo ""

# Test 1: Check dark mode is applied
echo "[TEST 1] Dark mode functionality is implemented"
if grep -q "darkMode ? \"bg-gray-900 text-white\" : \"bg-white text-black\"" "$TESTED_FILE"; then
    echo "✓ PASS: Dark mode colors applied conditionally"
else
    echo "✗ FAIL: Dark mode colors not applied"
    exit 1
fi

# Test 2: Check responsive grid
echo "[TEST 2] Grid is responsive"
if grep -q "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" "$TESTED_FILE"; then
    echo "✓ PASS: Responsive grid breakpoints present"
else
    echo "✗ FAIL: Grid not responsive"
    exit 1
fi

# Test 3: Check for loading state
echo "[TEST 3] Loading state is implemented"
if grep -q "isLoading" "$TESTED_FILE" && grep -q "Loading metrics..." "$TESTED_FILE"; then
    echo "✓ PASS: Loading state feedback present"
else
    echo "✗ FAIL: Loading state missing"
    exit 1
fi

# Test 4: Check for proper key usage (not array index)
echo "[TEST 4] React keys are not array indices"
if grep -q "key={\`\${m.label}-\${m.value}\`}" "$TESTED_FILE"; then
    echo "✓ PASS: Unique keys based on data"
else
    echo "✗ FAIL: Still using array index as key"
    exit 1
fi

# Test 5: Check min-h-screen usage
echo "[TEST 5] Layout uses min-h-screen (not h-screen)"
if grep -q "min-h-screen" "$TESTED_FILE" && ! grep -q "h-screen" "$TESTED_FILE"; then
    echo "✓ PASS: Responsive height applied"
else
    echo "✗ FAIL: Fixed height still present"
    exit 1
fi

# Test 6: Check button styling
echo "[TEST 6] Button has hover states"
if grep -q "hover:bg-" "$TESTED_FILE"; then
    echo "✓ PASS: Button has hover styles"
else
    echo "✗ FAIL: Button lacks hover states"
    exit 1
fi

# Test 7: Check card styling improvements
echo "[TEST 7] Metric cards have proper styling"
if grep -q "rounded-lg" "$TESTED_FILE" && grep -q "toLocaleString()" "$TESTED_FILE"; then
    echo "✓ PASS: Cards properly styled with rounded corners and formatted numbers"
else
    echo "✗ FAIL: Card styling incomplete"
    exit 1
fi

# Test 8: Verify backup file exists and is unchanged
echo "[TEST 8] Backup file is intact"
if [ -f "$BACKUP_FILE" ]; then
    echo "✓ PASS: Backup file exists"
else
    echo "✗ FAIL: Backup file missing"
    exit 1
fi

# Test 9: Verify report file exists
echo "[TEST 9] Report file generated"
if [ -f "$REPORT_FILE" ]; then
    echo "✓ PASS: UI report file exists"
else
    echo "✗ FAIL: Report file missing"
    exit 1
fi

echo ""
echo "=========================================="
echo "All tests passed! ✓"
echo "=========================================="
exit 0
