@echo off
setlocal EnableDelayedExpansion
set FILE=input.tsx
set ERRORS=0

echo Running UI checks on %FILE%
nREM 1) Fail if original placeholder color remains
findstr /n /c:"bg-gray-300" %FILE% >nul
if %ERRORLEVEL%==0 (
  echo FAIL: Found legacy placeholder color 'bg-gray-300'
  set /a ERRORS+=1
)

nREM 2) Ensure empty state exists
findstr /n /c:"No metrics available" %FILE% >nul
if NOT %ERRORLEVEL%==0 (
  echo FAIL: Missing empty state text 'No metrics available'
  set /a ERRORS+=1
)

nREM 3) Ensure cards have improved separation (bg-gray-50 or cardClasses)
findstr /n /c:"bg-gray-50" %FILE% >nul
if NOT %ERRORLEVEL%==0 (
  findstr /n /c:"cardClasses" %FILE% >nul
  if NOT %ERRORLEVEL%==0 (
    echo FAIL: Card separation not implemented (missing 'bg-gray-50' or 'cardClasses')
    set /a ERRORS+=1
  )
)

nREM 4) Ensure button has aria-label
findstr /n /c:"aria-label" %FILE% >nul
if NOT %ERRORLEVEL%==0 (
  echo FAIL: Dark mode toggle missing aria-label
  set /a ERRORS+=1
)

nREM 5) Ensure label/value colors are dark-mode aware
findstr /n /c:"text-gray-400" %FILE% >nul
if NOT %ERRORLEVEL%==0 (
  findstr /n /c:"text-white" %FILE% >nul
  if NOT %ERRORLEVEL%==0 (
    echo FAIL: Label/value color fixes not found (expected 'text-gray-400' or 'text-white')
    set /a ERRORS+=1
  )
)

nREM 6) Ensure improved focus styles present
findstr /n /c:"focus:ring-2" %FILE% >nul
if NOT %ERRORLEVEL%==0 (
  echo FAIL: Focus ring improvement not found (expected 'focus:ring-2')
  set /a ERRORS+=1
)

nif %ERRORS%==0 (
  echo PASS: All checks passed
  exit /b 0
) else (
  echo FAIL: %ERRORS% checks failed
  exit /b 2
)

