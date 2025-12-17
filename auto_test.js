#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const LOG_DIR = "logs";
const LOG_FILE = path.join(LOG_DIR, "ui_test.log");

// Ensure logs directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

// Detect OS
const isWindows = process.platform === "win32";
const testScript = isWindows ? "run_test.bat" : "./run_test.sh";

// Log function
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  fs.appendFileSync(LOG_FILE, logMessage + "\n");
}

// Initialize log
fs.writeFileSync(LOG_FILE, "");
log("=".repeat(60));
log("UI Test Runner - Auto Executor");
log("=".repeat(60));
log(`Detected OS: ${isWindows ? "Windows" : "Linux/macOS"}`);
log(`Tested File: input.tsx`);
log(`Starting test execution...`);
log("");

try {
  // Run test script
  log(`Executing: ${testScript}`);
  const output = execSync(testScript, { encoding: "utf-8", stdio: "pipe" });
  
  // Log test output
  output.split("\n").forEach((line) => {
    if (line.trim()) {
      log(line);
    }
  });

  // Extract issues from report
  if (fs.existsSync("ui_report.json")) {
    const report = JSON.parse(fs.readFileSync("ui_report.json", "utf-8"));
    log("");
    log("Issue Summary:");
    log(`  - Total Issues: ${report.summary.total_issues}`);
    log(`  - High Severity: ${report.summary.high}`);
    log(`  - Medium Severity: ${report.summary.medium}`);
    log(`  - Low Severity: ${report.summary.low}`);
  }

  // Final status
  log("");
  log("=".repeat(60));
  log("Final Status: PASS ✓");
  log("=".repeat(60));
  log("All tests passed successfully!");

  process.exit(0);
} catch (error) {
  log("");
  log("Error during test execution:");
  log(error.message);
  log("");
  log("=".repeat(60));
  log("Final Status: FAIL ✗");
  log("=".repeat(60));
  log("Some tests failed. Review output above.");

  process.exit(1);
}
