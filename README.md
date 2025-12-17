# UI Fixes for Dashboard (input.tsx)

## Summary of issues found
- Dark mode inconsistent: components used `dark:` Tailwind variants but the root did not set the `dark` class (High).
- Loading skeleton not accessible: missing `sr-only` status text and `aria-hidden` on decorative elements (Medium).
- No empty state: when metrics are empty the UI showed an empty grid (Medium).
- List key and text contrast: key used only `label` and text colors didn't adapt to dark mode (Low).
- Missing `role="main"` on root container for assistive tech (Low).

## What was fixed
- Added conditional `dark` class on the root container and `role="main"` to make Tailwind `dark:` variants work correctly.
- Added an `sr-only` loading message and set skeletons to `aria-hidden`.
- Render an explicit empty-state message card when there are no metrics.
- Use composite key for list items and add `dark:` text color classes to labels/values for correct contrast.

## How to run tests
- Linux / macOS: `./run_test.sh`
- Windows: `run_test.bat`
- Or use Node auto-runner: `node auto_test.js` (creates `logs/ui_test.log`)

## How to verify UI behavior manually
1. Open the component and toggle dark mode using the button — ensure all cards, texts, and skeletons switch to dark styles.
2. On initial load you should see three pulsing skeleton cards and screen-reader-only status text.
3. After ~1s the metrics should appear. If metrics are empty you should see a visible "No metrics available." card.

