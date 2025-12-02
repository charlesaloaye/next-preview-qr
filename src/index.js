const previewQRHook = require('./dev-hook');
const { getLocalIP } = require('./ip');
const { generateQRDataURI, printQRCode } = require('./qr');
const { createUIServer } = require('./ui-server');
const logger = require('./logger');

/**
 * Main module export
 * Can be used as a Next.js config hook or standalone
 */
function nextPreviewQR(options = {}) {
  return previewQRHook(options);
}

// Export utilities for advanced usage
nextPreviewQR.getLocalIP = getLocalIP;
nextPreviewQR.generateQRDataURI = generateQRDataURI;
nextPreviewQR.printQRCode = printQRCode;
nextPreviewQR.createUIServer = createUIServer;
nextPreviewQR.logger = logger;

module.exports = nextPreviewQR;

