Summary of fixes

What was found
- Labels inside metric cards used a static low-contrast class in dark mode (poor readability).
- Light-mode borders and the dark-mode toggle focus ring were underspecified (visual/UX issues).
- Dark mode preference wasn't persisted between sessions.
- There was no empty-state message when metrics array was empty.
- React keys used only the metric label (possible collisions).

What was fixed
- Labels now use conditional text color so they're readable in both light and dark themes.
- Buttons and cards have explicit light-mode border colors (border-gray-200) and improved focus styles (focus:ring-2 + colors).
- Dark mode preference is persisted to localStorage (read on mount, saved on change).
- Added an explicit "No metrics available" message and a small "Refresh" button to reload metrics.
- Keys are now constructed as `${m.label}-${i}` to avoid collisions.

How to run tests
- Node is required for the auto test runner.
- On macOS / Linux:
  - ./run_test.sh (make it executable if needed: chmod +x run_test.sh)
- On Windows:
  - run_test.bat
- Or simply run the auto runner which detects the OS and runs the correct script:
  - node auto_test.js
- Logs are saved to ./logs/ui_test.log

Manual verification steps
1. Open the component in your app (it mounts and simulates loading for ~1s).
2. Toggle dark mode and reload the page — the theme selection should persist.
3. Verify metric labels are readable in both themes and card borders look consistent in light and dark modes.
4. Click "Refresh" to re-run the simulated load; if metrics are removed (simulate by editing the data), the "No metrics available" message will show.

Notes
- Changes are intentionally minimal and preserve original intent and behavior.
- All styling changes use Tailwind CSS classes only (no inline styles).
