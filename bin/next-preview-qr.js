#!/usr/bin/env node

const { runCLI } = require('../src/cli');

// Parse command line arguments
const args = process.argv.slice(2);
const options = {
  nextPort: 3000,
  uiPort: 3001,
  openBrowser: false
};

// Simple argument parsing
for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  
  if (arg === '--port' || arg === '-p') {
    options.nextPort = parseInt(args[++i], 10) || 3000;
  } else if (arg === '--ui-port' || arg === '-u') {
    options.uiPort = parseInt(args[++i], 10) || 3001;
  } else if (arg === '--open' || arg === '-o') {
    options.openBrowser = true;
  } else if (arg === '--help' || arg === '-h') {
    console.log(`
Usage: next-preview-qr [options]

Options:
  -p, --port <port>      Port for Next.js dev server (default: 3000)
  -u, --ui-port <port>   Port for web UI server (default: 3001)
  -o, --open             Open browser automatically
  -h, --help             Show this help message

Examples:
  next-preview-qr
  next-preview-qr --port 3000 --open
  next-preview-qr -p 8080 -u 3002
`);
    process.exit(0);
  }
}

// Run the CLI
runCLI(options).catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});

