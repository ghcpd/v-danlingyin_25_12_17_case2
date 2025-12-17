@echo off
setlocal enabledelayedexpansion
set FILE=input.tsx
set FAILED=0

echo Running UI validation tests against %FILE%

rem 1) Ensure old buggy label class isn't present
findstr /n /c:"text-sm text-gray-500 mb-2" %FILE% >nul && (
  echo [FAIL] Found non-conditional label class 'text-sm text-gray-500 mb-2' - should adapt to dark mode
  set FAILED=1
) || echo [OK] Label class is conditional or updated

rem 2) Ensure key isn't just the label
findstr /n /c:"key={m.label}" %FILE% >nul && (
  echo [FAIL] Found key={m.label} - possible collisions.
  set FAILED=1
) || echo [OK] Keys are not simple label (unique/enhanced).

rem 3) Ensure localStorage usage exists
findstr /n /c:"localStorage" %FILE% >nul || (
  echo [FAIL] localStorage usage not found - dark mode persistence missing.
  set FAILED=1
) && echo [OK] localStorage usage found.

rem 4) Ensure there's an empty-state message
findstr /n /c:"No metrics available" %FILE% >nul || (
  echo [FAIL] Missing empty-state message 'No metrics available'.
  set FAILED=1
) && echo [OK] Empty-state message present.

rem 5) Ensure light-mode border color and focus ring improvements present
findstr /n /c:"border-gray-200" %FILE% >nul || (
  echo [FAIL] border-gray-200 not found - light-mode borders may be missing.
  set FAILED=1
) && echo [OK] border-gray-200 present.

findstr /n /c:"focus:ring-2" %FILE% >nul || (
  echo [FAIL] focus:ring-2 not found - improved focus styles missing.
  set FAILED=1
) && echo [OK] focus:ring-2 present.

if %FAILED% NEQ 0 (
  echo.
  echo RESULT: FAIL
  exit /b 1
) else (
  echo.
  echo RESULT: PASS
  exit /b 0
)
