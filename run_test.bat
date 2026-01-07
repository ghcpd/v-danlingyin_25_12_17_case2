@echo off

set file=input.tsx

findstr /c:"className=\"w-screen h-screen bg-white text-black p-4\"" %file% >nul
if %errorlevel% equ 0 (
    echo FAIL: Hardcoded colors found
    exit /b 1
)

findstr /c:"loading" %file% >nul
if %errorlevel% neq 0 (
    echo FAIL: Loading state missing
    exit /b 1
)

findstr /c:"grid-cols-1 md:grid-cols-3" %file% >nul
if %errorlevel% neq 0 (
    echo FAIL: Responsive grid missing
    exit /b 1
)

echo PASS
exit /b 0