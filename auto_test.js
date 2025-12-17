const fs = require('fs');
const { exec, execSync } = require('child_process');
const path = require('path');

const platform = process.platform;
const cwd = process.cwd();
const testFile = platform === 'win32' ? 'run_test.bat' : 'run_test.sh';
const logDir = path.join(cwd, 'logs');
const logFile = path.join(logDir, 'ui_test.log');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const timestamp = new Date().toISOString();
let logEntries = [];
logEntries.push(`Timestamp: ${timestamp}`);
logEntries.push(`Platform: ${platform}`);
logEntries.push(`Tested file: input.tsx`);

function runCommand(command, callback) {
  const proc = exec(command, { cwd }, (error, stdout, stderr) => {
    if (stdout) logEntries.push(`STDOUT: ${stdout.trim()}`);
    if (stderr) logEntries.push(`STDERR: ${stderr.trim()}`);
    if (error) {
      logEntries.push(`ERROR: ${error.message}`);
    }
    callback(error ? 1 : 0);
  });
}

const command = platform === 'win32' ? `cmd /c "${testFile}"` : `bash -lc "./${testFile}"`;
runCommand(command, (exitCode) => {
  const status = exitCode === 0 ? 'PASS' : 'FAIL';
  logEntries.push(`Final status: ${status}`);
  fs.writeFileSync(logFile, logEntries.join('\n'));
  console.log(status);
  process.exit(exitCode);
});
