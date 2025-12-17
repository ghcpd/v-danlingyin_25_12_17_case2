# UI Fixes — Dashboard (`input.tsx`)

## Summary

Found issues:
- Loading placeholders were using fixed light colors and became low-contrast in dark mode.
- Metric labels/values did not adjust colors for dark mode.
- Cards blended with page background in light mode (no separation).
- No empty state shown when `metrics` is empty after loading.
- Dark mode toggle lacked `aria-label` and had weak focus styling.

What was fixed:
- Placeholders now use dark-mode-aware colors and `cardClasses`.
- Labels and values use conditional classes for readable colors in both themes.
- Cards have subtle `bg-gray-50` and borders in light mode, and `bg-gray-800`/borders in dark mode.
- Added a `No metrics available` empty state with `data-testid="empty-state"`.
- Dark mode toggle now has `aria-label`, improved focus ring, and preference persistence in `localStorage`.

## How to run tests

Unix/macOS:

1. From project root run: `./run_test.sh`

Windows:

1. From project root run: `run_test.bat`

Auto-run (Node.js):

1. `node auto_test.js` — this detects OS, runs tests, and appends logs to `logs/ui_test.log`.

## How to verify UI behavior manually

- Launch the app and confirm the dashboard renders metrics after ~1s.
- Toggle dark mode with the button and verify:
  - Button receives focus ring when tabbed to
  - Colors update (labels and values readable)
  - Placeholders and cards remain visible and distinct
- When `metrics` is empty (simulate by clearing the `metrics` array), you should see `No metrics available` in the grid.

## Notes

- A backup of the original file is available as `input_backup.tsx`.
- The `ui_report.json` contains a structured list of issues, fixes, and before/after snippets.

