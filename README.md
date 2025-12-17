# UI Case: fast-oswe-1206

## Summary
This repository contains a simplified React + TypeScript dashboard component (`input.tsx`) that originally had several UI bugs and missing features. We fixed the issues and added tests and documentation.

## What issues were found
- Dark mode state was not applied to the UI (static classes) — **High**
- Toggle button label was static and did not indicate the current theme — **Medium**
- Metrics were shown without a loading indicator — **Medium**
- Grid layout did not use responsive responsive Tailwind classes — **Medium** (Missing feature)
- Accessibility issues: missing roles, aria attributes — **Low/Code Smell**
- Values were rendered as raw numbers — **Low** (UX)
- Container used `w-screen h-screen` causing layout overflow — **Low**

See **ui_report.json** for a full list and line numbers.

## What was fixed
- Applied conditional Tailwind classes to root container (`bg-gray-900 text-white` vs `bg-white text-black`) and added transition.
- Toggle button now reflects state (`Switch to Light Mode` / `Switch to Dark Mode`) and has accessible attributes and focus styling.
- Added a loading spinner / message while metrics load (`isLoading` state + 1s timeout + cleanup).
- Grid layout is now responsive: `grid-cols-1 sm:grid-cols-2 md:grid-cols-3`.
- Added semantic `role="list"` and `role="listitem"` attributes for accessibility.
- Formatted numbers with `Intl.NumberFormat`.
- Replaced `w-screen h-screen` with `w-full min-h-screen` and added transitions.

## How to run tests

**Linux / macOS**
```
./run_test.sh
```

**Windows (cmd)**
```
run_test.bat
```

The scripts parse `input.tsx` and validate the presence of the required patterns and behaviors. They will report **PASS** if the file contains the fixed patterns; otherwise they will **FAIL** with details.

## How to verify UI behavior manually
- Run the project/build and open it in a browser.
- You should see a dashboard with a centered loading message for ~1 second.
- After the metrics load, the grid should be responsive (1 column on small screens, 2 on sm, 3 on md+ screens).
- Clicking the toggle button should switch between dark and light modes and update the button label.
- Grid items should have rounded corners and subtle shadows.

## Test runner
The repo includes `auto_test.js` that detects the OS and runs the appropriate test script, logging output to `logs/ui_test.log`.
