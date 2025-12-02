const express = require('express');
const { generateQRDataURI } = require('./qr');
const logger = require('./logger');

/**
 * Create and start the web UI server
 * @param {Object} options - Server options
 * @param {number} options.port - Port for the UI server
 * @param {string} options.previewUrl - The preview URL to display
 * @param {Function} options.onLog - Callback for WebSocket log messages
 * @returns {Promise<Object>} Server instance and port
 */
async function createUIServer({ port = 3001, previewUrl, onLog }) {
  const app = express();
  
  // Generate QR code data URI
  const qrDataURI = await generateQRDataURI(previewUrl);
  
  // Serve the web UI
  app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Next.js Preview QR</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .container {
      background: white;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      text-align: center;
      max-width: 500px;
      width: 100%;
    }
    h1 {
      color: #333;
      margin-bottom: 10px;
      font-size: 28px;
    }
    .subtitle {
      color: #666;
      margin-bottom: 30px;
      font-size: 14px;
    }
    .qr-container {
      background: white;
      padding: 20px;
      border-radius: 10px;
      display: inline-block;
      margin: 20px 0;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
    .qr-container img {
      display: block;
      max-width: 100%;
      height: auto;
    }
    .url-container {
      margin-top: 30px;
      padding: 15px;
      background: #f5f5f5;
      border-radius: 8px;
      word-break: break-all;
    }
    .url-label {
      font-size: 12px;
      color: #666;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .url {
      color: #667eea;
      font-weight: 600;
      font-size: 16px;
      text-decoration: none;
    }
    .url:hover {
      text-decoration: underline;
    }
    .instructions {
      margin-top: 30px;
      padding: 20px;
      background: #f9f9f9;
      border-radius: 8px;
      text-align: left;
    }
    .instructions h3 {
      color: #333;
      margin-bottom: 10px;
      font-size: 16px;
    }
    .instructions ol {
      margin-left: 20px;
      color: #666;
      font-size: 14px;
      line-height: 1.8;
    }
    .status {
      margin-top: 20px;
      padding: 10px;
      background: #e8f5e9;
      border-radius: 8px;
      color: #2e7d32;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📱 Next.js Preview</h1>
    <p class="subtitle">Scan the QR code to open on your mobile device</p>
    
    <div class="qr-container">
      <img src="${qrDataURI}" alt="QR Code" />
    </div>
    
    <div class="url-container">
      <div class="url-label">Preview URL</div>
      <a href="${previewUrl}" target="_blank" class="url">${previewUrl}</a>
    </div>
    
    <div class="instructions">
      <h3>How to use:</h3>
      <ol>
        <li>Open your camera app on your mobile device</li>
        <li>Point it at the QR code above</li>
        <li>Tap the notification to open the preview</li>
        <li>Make sure your device is on the same network</li>
      </ol>
    </div>
    
    <div class="status">
      ✓ Development server is running
    </div>
  </div>
</body>
</html>
    `);
  });
  
  // WebSocket server for log forwarding
  const http = require('http');
  const server = http.createServer(app);
  const WebSocket = require('ws');
  const wss = new WebSocket.Server({ server });
  
  wss.on('connection', (ws) => {
    logger.info('Mobile device connected for log forwarding');
    
    ws.on('message', (message) => {
      try {
        const data = JSON.parse(message.toString());
        if (data.type === 'console' && onLog) {
          onLog(data.level, data.message);
        }
      } catch (err) {
        // Ignore invalid messages
      }
    });
    
    ws.on('close', () => {
      logger.info('Mobile device disconnected');
    });
  });
  
  return new Promise((resolve, reject) => {
    server.listen(port, (err) => {
      if (err) {
        reject(err);
      } else {
        logger.success(`Web UI server running at http://localhost:${port}`);
        resolve({ server, port });
      }
    });
  });
}

module.exports = { createUIServer };

