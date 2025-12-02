const os = require('os');

/**
 * Get the local IPv4 address for LAN access
 * @returns {string|null} The LAN IP address or null if not found
 */
function getLocalIP() {
  const interfaces = os.networkInterfaces();
  
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip internal (loopback) and non-IPv4 addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  
  return null;
}

module.exports = { getLocalIP };

