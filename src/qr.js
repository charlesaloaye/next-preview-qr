const QRCode = require('qrcode');
const qrcode = require('qrcode-terminal');

/**
 * Generate QR code data URI
 * @param {string} text - Text to encode in QR code
 * @returns {Promise<string>} Data URI of the QR code image
 */
async function generateQRDataURI(text) {
  try {
    return await QRCode.toDataURL(text, {
      errorCorrectionLevel: 'M',
      type: 'image/png',
      width: 300,
      margin: 1
    });
  } catch (err) {
    throw new Error(`Failed to generate QR code: ${err.message}`);
  }
}

/**
 * Print QR code to terminal
 * @param {string} text - Text to encode in QR code
 */
function printQRCode(text) {
  qrcode.generate(text, { small: true });
}

module.exports = {
  generateQRDataURI,
  printQRCode
};

