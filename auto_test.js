const fs = require('fs');
const os = require('os');
const { exec } = require('child_process');

fs.mkdirSync('logs', { recursive: true });

const platform = os.platform();
const script = platform === 'win32' ? 'run_test.bat' : './run_test.sh';

exec(script, (error, stdout, stderr) => {
    const timestamp = new Date().toISOString();
    const status = error ? 'FAIL' : 'PASS';
    const issues = stderr || 'none';
    const log = `${timestamp} - tested file: input.tsx - detected issues: ${issues} - final status: ${status}\n`;
    fs.appendFileSync('logs/ui_test.log', log);
    console.log(log);
});