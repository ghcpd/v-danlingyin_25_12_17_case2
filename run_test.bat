@echo off
setlocal
set FILE=input.tsx
set PASS=1

rem Helper for checks using findstr
:check
findstr /C:"%~1" "%FILE%" >nul || (
  echo FAIL: %~2
  set PASS=0
)
exit /b 0

rem Check Dark Mode classes are applied
call :check "bg-gray-900" "'bg-gray-900' class not found"
call :check "text-white" "'text-white' class not found"

rem Check isLoading state is declared and used
call :check "const [isLoading, setIsLoading]" "isLoading state not found"

rem Check setTimeout and clearTimeout in useEffect
call :check "setTimeout(" "setTimeout missing"
call :check "clearTimeout(" "clearTimeout missing"

rem Check loading indicator
call :check "Loading metrics" "Loading indicator missing"

rem Check responsive grid classes
call :check "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" "Responsive grid classes missing"

rem Check button accessibility and label text
call :check "aria-pressed={darkMode}" "aria-pressed attribute missing on button"
call :check "type=\"button\"" "type=\"button\" attribute missing on button"
call :check "Switch to Dark Mode" "Dark mode toggle text missing"
call :check "Switch to Light Mode" "Light mode toggle text missing"

rem Check role attributes
call :check "role=\"list\"" "role=\"list\" missing on container"
call :check "role=\"listitem\"" "role=\"listitem\" missing on items"

rem Check Intl.NumberFormat usage
call :check "Intl.NumberFormat" "Intl.NumberFormat formatting missing"

rem Ensure no leftover w-screen class
call :check "w-screen" "w-screen class should be replaced with w-full"

if %PASS%==1 (
  echo PASS
) else (
  exit /b 1
)
