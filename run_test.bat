@echo off
set FILE=input.tsx
set ERRORS=0

findstr /n /c:role=main %FILE% >nul
if %errorlevel% NEQ 0 (
  echo FAIL: missing role=main on root container
  set /a ERRORS+=1
)

findstr /n /c:sr-only %FILE% >nul
if %errorlevel% NEQ 0 (
  echo FAIL: missing sr-only loading message for screen readers
  set /a ERRORS+=1
)

findstr /n /c:"No metrics available" %FILE% >nul
if %errorlevel% NEQ 0 (
  echo FAIL: missing empty state message for no metrics
  set /a ERRORS+=1
)

findstr /R /C:"m.label.*m.value" %FILE% >nul
if %errorlevel% NEQ 0 (
  echo FAIL: missing composite key pattern with both m.label and m.value on same line
  set /a ERRORS+=1
)

findstr /n /c:aria-live %FILE% >nul
if %errorlevel% NEQ 0 (
  echo FAIL: missing aria-live on loading status
  set /a ERRORS+=1
)

findstr /n /c:"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3" %FILE% >nul
if %errorlevel% NEQ 0 (
  echo FAIL: missing responsive grid classes
  set /a ERRORS+=1
)

if %ERRORS%==0 (
  echo FINAL: PASS - All checks passed
  exit /b 0
) else (
  echo FINAL: FAIL - %ERRORS% issue(s) found
  exit /b 1
)
