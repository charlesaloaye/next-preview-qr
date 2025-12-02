const { spawn } = require('child_process');
const { getLocalIP } = require('./ip');
const { printQRCode } = require('./qr');
const { createUIServer } = require('./ui-server');
const logger = require('./logger');
const open = require('open');

/**
 * Run Next.js dev server with QR preview
 * @param {Object} options - CLI options
 * @param {number} options.nextPort - Port for Next.js dev server
 * @param {number} options.uiPort - Port for UI server
 * @param {boolean} options.openBrowser - Whether to open browser automatically
 */
async function runCLI({ nextPort = 3000, uiPort = 3001, openBrowser = false }) {
  const localIP = getLocalIP();
  
  if (!localIP) {
    logger.error('Could not detect local IP address. Make sure you are connected to a network.');
    process.exit(1);
  }
  
  const previewUrl = `http://${localIP}:${nextPort}`;
  const uiUrl = `http://localhost:${uiPort}`;
  
  // WebSocket log handler
  const handleLog = (level, message) => {
    const levelColors = {
      log: logger.log,
      info: logger.info,
      warn: logger.warn,
      error: logger.error
    };
    const logFn = levelColors[level] || logger.log;
    logFn(`[Mobile] ${message}`);
  };
  
  // Start UI server
  let uiServer;
  try {
    const uiResult = await createUIServer({
      port: uiPort,
      previewUrl,
      onLog: handleLog
    });
    uiServer = uiResult.server;
  } catch (err) {
    logger.error(`Failed to start UI server: ${err.message}`);
    process.exit(1);
  }
  
  // Print instructions
  console.log('\n' + '='.repeat(60));
  logger.success('Next.js Preview QR is ready!');
  console.log('='.repeat(60) + '\n');
  
  logger.info(`Preview URL: ${previewUrl}`);
  logger.info(`Web UI: ${uiUrl}`);
  console.log('');
  
  // Print QR code
  logger.info('Scan this QR code with your mobile device:');
  console.log('');
  printQRCode(previewUrl);
  console.log('');
  
  // Open browser if requested
  if (openBrowser) {
    setTimeout(() => {
      open(uiUrl).catch(() => {
        logger.warn('Could not open browser automatically');
      });
    }, 1000);
  }
  
  // Start Next.js dev server
  logger.info('Starting Next.js development server...\n');
  
  const nextProcess = spawn('npx', ['next', 'dev', '-p', nextPort.toString()], {
    stdio: 'inherit',
    shell: true
  });
  
  // Handle process termination
  const cleanup = () => {
    logger.info('\nShutting down...');
    if (uiServer) {
      uiServer.close();
    }
    if (nextProcess && !nextProcess.killed) {
      nextProcess.kill();
    }
    process.exit(0);
  };
  
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);
  
  nextProcess.on('error', (err) => {
    logger.error(`Failed to start Next.js: ${err.message}`);
    logger.info('Make sure Next.js is installed in your project.');
    cleanup();
  });
  
  nextProcess.on('exit', (code) => {
    if (code !== 0 && code !== null) {
      logger.error(`Next.js process exited with code ${code}`);
    }
    cleanup();
  });
}

module.exports = { runCLI };

