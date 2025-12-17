const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const isWindows = process.platform === 'win32';
const script = isWindows ? 'run_test.bat' : './run_test.sh';
const logfile = path.join(__dirname, 'logs', 'ui_test.log');

if (!fs.existsSync(path.dirname(logfile))) fs.mkdirSync(path.dirname(logfile), { recursive: true });

const timestamp = new Date().toISOString();
const testedFile = 'input.tsx';

console.log(`Running ${script} (detected platform: ${isWindows ? 'Windows' : 'Unix-like'})`);

const res = spawnSync(script, { shell: true, encoding: 'utf8' });
const output = (res.stdout || '') + (res.stderr || '');
const status = res.status === 0 ? 'PASS' : 'FAIL';

const logEntry = [`[${timestamp}] Tested: ${testedFile}`, `Status: ${status}`, 'Output:', output.trim(), '---'].join('\n');

fs.appendFileSync(logfile, logEntry + '\n');

console.log(logEntry);
process.exit(res.status === 0 ? 0 : 2);
