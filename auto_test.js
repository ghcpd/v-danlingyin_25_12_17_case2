const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, 'logs');
const logFile = path.join(logDir, 'ui_test.log');
const testedFile = 'input.tsx';

if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

const timestamp = new Date().toISOString();
console.log(`${timestamp} - Running UI tests on ${testedFile}`);

const content = fs.readFileSync(path.join(__dirname, testedFile), 'utf8');
const issues = [];

const checks = [
  { key: 'role="main"', msg: 'missing role="main" on root container' },
  { key: 'sr-only', msg: 'missing sr-only loading message for screen readers' },
  { key: 'No metrics available', msg: 'missing empty state message for no metrics' },
  { key: 'm.label.*m.value', msg: 'missing composite key using label and value', regex: true },
  { key: 'aria-live', msg: 'missing aria-live on loading status' },
  { key: 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3', msg: 'missing responsive grid classes' },
];

for (const c of checks) {
  if (c.regex) {
    const re = new RegExp(c.key);
    if (!re.test(content)) issues.push(c.msg);
  } else {
    if (!content.includes(c.key)) issues.push(c.msg);
  }
}

const status = issues.length ? 'FAIL' : 'PASS';
const log = [`[${timestamp}]`, `file: ${testedFile}`, `status: ${status}`, 'detected_issues:', issues.length ? issues.join('; ') : 'none', 'output:', 'See above'].join('\n');

fs.appendFileSync(logFile, log + '\n\n', 'utf8');

if (issues.length) {
  console.log('FAIL:');
  issues.forEach((i) => console.log('- ' + i));
  console.log(`Final status: ${status}`);
  process.exit(1);
} else {
  console.log('PASS - All checks passed');
  console.log(`Final status: ${status}`);
  process.exit(0);
}
