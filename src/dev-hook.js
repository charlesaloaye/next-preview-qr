const { getLocalIP } = require('./ip');
const { printQRCode } = require('./qr');
const { createUIServer } = require('./ui-server');
const logger = require('./logger');

/**
 * Next.js configuration hook for QR preview
 * @param {Object} options - Configuration options
 * @param {number} options.port - Next.js dev server port
 * @param {number} options.uiPort - UI server port
 * @returns {Object} Next.js configuration
 */
function previewQRHook({ port = 3000, uiPort = 3001 } = {}) {
  let uiServer;
  let isServerStarted = false;
  
  const startPreviewServer = async () => {
    if (isServerStarted) return;
    isServerStarted = true;
    
    const localIP = getLocalIP();
    
    if (!localIP) {
      logger.warn('Could not detect local IP address. QR preview may not work.');
      return;
    }
    
    const previewUrl = `http://${localIP}:${port}`;
    
    try {
      const result = await createUIServer({
        port: uiPort,
        previewUrl,
        onLog: (level, message) => {
          const levelColors = {
            log: logger.log,
            info: logger.info,
            warn: logger.warn,
            error: logger.error
          };
          const logFn = levelColors[level] || logger.log;
          logFn(`[Mobile] ${message}`);
        }
      });
      uiServer = result.server;
      
      // Print QR code after a short delay to ensure Next.js has started
      setTimeout(() => {
        console.log('\n' + '='.repeat(60));
        logger.success('Next.js Preview QR is ready!');
        console.log('='.repeat(60) + '\n');
        logger.info(`Preview URL: ${previewUrl}`);
        logger.info(`Web UI: http://localhost:${uiPort}`);
        console.log('');
        logger.info('Scan this QR code with your mobile device:');
        console.log('');
        printQRCode(previewUrl);
        console.log('');
      }, 2000);
    } catch (err) {
      logger.warn(`Failed to start preview server: ${err.message}`);
    }
  };
  
  // Start server when module is loaded
  startPreviewServer();
  
  // Return Next.js config (can be extended)
  return {
    // You can add Next.js config overrides here if needed
    // For now, we just return an empty object
  };
}

module.exports = previewQRHook;

