const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const isWin = process.platform === 'win32';
const cmd = isWin ? 'run_test.bat' : 'bash run_test.sh';
const logfileDir = path.join(__dirname, 'logs');
const logfile = path.join(logfileDir, 'ui_test.log');

if (!fs.existsSync(logfileDir)) fs.mkdirSync(logfileDir);

const start = new Date().toISOString();
const header = `[${start}] Running UI tests on ${isWin ? 'Windows' : 'Unix'} - file: input.tsx\n`;
fs.appendFileSync(logfile, header);

exec(cmd, { cwd: __dirname, windowsHide: true }, (err, stdout, stderr) => {
  const ts = new Date().toISOString();
  let status = 'PASS';
  let details = '';

  if (err) {
    status = 'FAIL';
    details += `errorCode=${err.code} `;
  }
  if (stdout) details += `stdout:\n${stdout}\n`;
  if (stderr) details += `stderr:\n${stderr}\n`;

  const footer = `[${ts}] Status: ${status}\n${details}\n`;
  fs.appendFileSync(logfile, footer);

  console.log(footer);
  process.exit(err ? 1 : 0);
});
