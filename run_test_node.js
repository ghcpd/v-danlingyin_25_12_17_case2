const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'input.tsx');
const s = fs.readFileSync(file, 'utf8');
let errors = 0;

function check(name, ok) {
  console.log((ok ? 'OK  ' : 'FAIL') + ' - ' + name);
  if (!ok) errors++;
}

check("no legacy placeholder bg-gray-300", !/bg-gray-300/.test(s));
check("has empty state text 'No metrics available'", /No metrics available/.test(s));
check("has card separation (bg-gray-50)", /bg-gray-50/.test(s));
check("or has cardClasses", /cardClasses/.test(s));
check("button has aria-label", /aria-label/.test(s));
check("label color text-gray-400 present", /text-gray-400/.test(s));
check("has text-white (value/dark) present", /text-white/.test(s));
check("has focus:ring-2", /focus:ring-2/.test(s));

console.log('');
if (errors === 0) {
  console.log('PASS: All checks passed');
  process.exit(0);
} else {
  console.log('FAIL: ' + errors + ' check(s) failed');
  process.exit(2);
}
