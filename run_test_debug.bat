@echo off
set FILE=input.tsx

echo Debugging checks for %FILE%

echo 1) placeholder 'bg-gray-300' present?
findstr /n /c:"bg-gray-300" %FILE% >nul && (echo FOUND) || (echo MISSING)

echo 2) empty state 'No metrics available' present?
findstr /n /c:"No metrics available" %FILE% >nul && (echo FOUND) || (echo MISSING)

echo 3) card separation 'bg-gray-50' present?
findstr /n /c:"bg-gray-50" %FILE% >nul && (echo FOUND) || (echo MISSING)

echo 4) card separation 'cardClasses' present?
findstr /n /c:"cardClasses" %FILE% >nul && (echo FOUND) || (echo MISSING)

echo 5) button aria-label present?
findstr /n /c:"aria-label" %FILE% >nul && (echo FOUND) || (echo MISSING)

echo 6) label color 'text-gray-400' present?
findstr /n /c:"text-gray-400" %FILE% >nul && (echo FOUND) || (echo MISSING)

echo 7) any 'text-white' present?
findstr /n /c:"text-white" %FILE% >nul && (echo FOUND) || (echo MISSING)

echo 8) focus ring 'focus:ring-2' present?
findstr /n /c:"focus:ring-2" %FILE% >nul && (echo FOUND) || (echo MISSING)

echo Done.
