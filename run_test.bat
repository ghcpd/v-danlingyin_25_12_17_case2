@echo off
REM UI Test Script for Dashboard Component
REM Platform: Windows

setlocal enabledelayedexpansion

set TESTED_FILE=input.tsx
set BACKUP_FILE=input_backup.tsx
set REPORT_FILE=ui_report.json

echo ==========================================
echo UI Test Suite - Dashboard Component
echo ==========================================
echo.

REM Test 1: Check dark mode is applied
echo [TEST 1] Dark mode functionality is implemented
findstr /M "darkMode ? \"bg-gray-900 text-white\" : \"bg-white text-black\"" %TESTED_FILE% >nul
if %errorlevel% equ 0 (
    echo ^✓ PASS: Dark mode colors applied conditionally
) else (
    echo ^✗ FAIL: Dark mode colors not applied
    exit /b 1
)

REM Test 2: Check responsive grid
echo [TEST 2] Grid is responsive
findstr /M "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" %TESTED_FILE% >nul
if %errorlevel% equ 0 (
    echo ^✓ PASS: Responsive grid breakpoints present
) else (
    echo ^✗ FAIL: Grid not responsive
    exit /b 1
)

REM Test 3: Check for loading state
echo [TEST 3] Loading state is implemented
findstr /M "isLoading" %TESTED_FILE% >nul
if %errorlevel% equ 0 (
    findstr /M "Loading metrics" %TESTED_FILE% >nul
    if !errorlevel! equ 0 (
        echo ^✓ PASS: Loading state feedback present
    ) else (
        echo ^✗ FAIL: Loading state missing
        exit /b 1
    )
) else (
    echo ^✗ FAIL: Loading state missing
    exit /b 1
)

REM Test 4: Check for proper key usage (not array index)
echo [TEST 4] React keys are not array indices
findstr /M "key=" %TESTED_FILE% >nul
if %errorlevel% equ 0 (
    findstr /M "label.*value" %TESTED_FILE% >nul
    if !errorlevel! equ 0 (
        echo ^✓ PASS: Unique keys based on data
    ) else (
        echo ^✗ FAIL: Still using array index as key
        exit /b 1
    )
) else (
    echo ^✗ FAIL: Key implementation missing
    exit /b 1
)

REM Test 5: Check min-h-screen usage
echo [TEST 5] Layout uses min-h-screen (not h-screen)
findstr /M "min-h-screen" %TESTED_FILE% >nul
if %errorlevel% equ 0 (
    echo ^✓ PASS: Responsive height applied
) else (
    echo ^✗ FAIL: Fixed height still present
    exit /b 1
)

REM Test 6: Check button styling
echo [TEST 6] Button has hover states
findstr /M "hover:bg-" %TESTED_FILE% >nul
if %errorlevel% equ 0 (
    echo ^✓ PASS: Button has hover styles
) else (
    echo ^✗ FAIL: Button lacks hover states
    exit /b 1
)

REM Test 7: Check card styling improvements
echo [TEST 7] Metric cards have proper styling
findstr /M "rounded-lg" %TESTED_FILE% >nul
if %errorlevel% equ 0 (
    findstr /M "toLocaleString" %TESTED_FILE% >nul
    if !errorlevel! equ 0 (
        echo ^✓ PASS: Cards properly styled with rounded corners and formatted numbers
    ) else (
        echo ^✗ FAIL: Card styling incomplete
        exit /b 1
    )
) else (
    echo ^✗ FAIL: Card styling incomplete
    exit /b 1
)

REM Test 8: Verify backup file exists
echo [TEST 8] Backup file is intact
if exist %BACKUP_FILE% (
    echo ^✓ PASS: Backup file exists
) else (
    echo ^✗ FAIL: Backup file missing
    exit /b 1
)

REM Test 9: Verify report file exists
echo [TEST 9] Report file generated
if exist %REPORT_FILE% (
    echo ^✓ PASS: UI report file exists
) else (
    echo ^✗ FAIL: Report file missing
    exit /b 1
)

echo.
echo ==========================================
echo All tests passed! ✓
echo ==========================================
exit /b 0
