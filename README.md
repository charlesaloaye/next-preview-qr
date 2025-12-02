# next-preview-qr

> Expo-style QR code preview for Next.js dev server

[![npm version](https://img.shields.io/npm/v/next-preview-qr.svg)](https://www.npmjs.com/package/next-preview-qr)
[![npm downloads](https://img.shields.io/npm/dm/next-preview-qr.svg)](https://www.npmjs.com/package/next-preview-qr)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Automatically generate QR codes for your Next.js development server, making it easy to preview your app on mobile devices during development. Inspired by Expo's QR code preview feature.

## ✨ Features

- 📱 **QR Code Generation** - Automatically generates QR codes in the terminal
- 🌐 **Web UI** - Beautiful web interface displaying the QR code and preview URL
- 🔗 **LAN Access** - Automatically detects your local IP for network access
- 📊 **Mobile Log Forwarding** - Forward console logs from mobile devices via WebSocket
- ⚡ **Zero Configuration** - Works out of the box with Next.js 13, 14, 15, and 16
- 🎨 **Beautiful UI** - Modern, responsive web interface

## 📦 Installation

```bash
npm install --save-dev next-preview-qr
```

or

```bash
yarn add -D next-preview-qr
```

or

```bash
pnpm add -D next-preview-qr
```

## 🚀 Usage

### Method 1: CLI Command

Run your Next.js dev server with QR preview:

```bash
npx next-preview-qr
```

This will:

- Start Next.js dev server on port 3000 (default)
- Start a web UI server on port 3001 (default)
- Display a QR code in your terminal
- Show the preview URL

**Options:**

```bash
next-preview-qr [options]

Options:
  -p, --port <port>      Port for Next.js dev server (default: 3000)
  -u, --ui-port <port>   Port for web UI server (default: 3001)
  -o, --open             Open browser automatically
  -h, --help             Show this help message
```

**Examples:**

```bash
# Use custom ports
next-preview-qr --port 8080 --ui-port 3002

# Open browser automatically
next-preview-qr --open

# Short form
next-preview-qr -p 3000 -o
```

### Method 2: Next.js Config Hook

Add to your `next.config.js`:

```javascript
const previewQr = require("next-preview-qr");

module.exports = previewQr({
  port: 3000, // Next.js dev server port
  uiPort: 3001, // Web UI server port
});
```

Then run your dev server normally:

```bash
npm run dev
```

The QR code will automatically appear when the server starts.

### Method 3: NPM Script

Add to your `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "dev:qr": "next-preview-qr"
  }
}
```

Then run:

```bash
npm run dev:qr
```

## 📱 Mobile Preview

1. **Scan the QR code** displayed in your terminal or web UI
2. **Open the link** on your mobile device
3. **Make sure** your mobile device is on the same Wi-Fi network as your development machine

The QR code contains a URL like `http://192.168.1.100:3000` that points to your Next.js dev server.

## 🌐 Web UI

When you run `next-preview-qr`, a web UI is automatically available at `http://localhost:3001` (or your custom UI port). The web UI provides:

- Large, scannable QR code
- Preview URL display
- Instructions for mobile access
- Server status indicator

## 📊 Mobile Log Forwarding

The package includes WebSocket support for forwarding console logs from mobile devices. This feature allows you to see logs from your mobile browser in your development terminal.

To use this feature, you'll need to add client-side code to your Next.js app (this is optional and for advanced users).

## 🛠️ API

### `nextPreviewQR(options)`

Main function for Next.js config integration.

**Parameters:**

- `options.port` (number, default: 3000) - Next.js dev server port
- `options.uiPort` (number, default: 3001) - Web UI server port

**Returns:** Next.js configuration object

### Utilities

The package also exports utilities for advanced usage:

```javascript
const previewQr = require("next-preview-qr");

// Get local IP address
const ip = previewQr.getLocalIP();

// Generate QR code data URI
const dataURI = await previewQr.generateQRDataURI("http://example.com");

// Print QR code to terminal
previewQr.printQRCode("http://example.com");

// Create UI server manually
const { server } = await previewQr.createUIServer({
  port: 3001,
  previewUrl: "http://192.168.1.100:3000",
  onLog: (level, message) => {
    console.log(`[Mobile ${level}]:`, message);
  },
});
```

## 📋 Requirements

- Node.js >= 14.0.0
- Next.js 13, 14, or 15
- Your device and development machine on the same network

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by Expo's QR code preview feature
- Built with [qrcode](https://www.npmjs.com/package/qrcode) and [qrcode-terminal](https://www.npmjs.com/package/qrcode-terminal)

## 📸 Screenshots

_Add screenshots of the terminal QR code and web UI here_

## 🐛 Troubleshooting

### QR code doesn't work

- Make sure your mobile device is on the same Wi-Fi network
- Check that your firewall isn't blocking the port
- Verify the IP address is correct (check with `ifconfig` or `ipconfig`)

### Port already in use

- Use the `--port` and `--ui-port` options to specify different ports
- Make sure no other services are using those ports

### Can't detect local IP

- Ensure you're connected to a network (Wi-Fi or Ethernet)
- Try restarting your network connection
- On some systems, you may need to manually specify the IP

### Middleware deprecation warning (Next.js 16+)

If you see a warning about "middleware" being deprecated in favor of "proxy", this is a Next.js 16+ warning and is **not related to this package**. This package doesn't use Next.js middleware.

If you have a `middleware.ts` or `middleware.js` file in your Next.js project, you should migrate it to `proxy.ts` or `proxy.js`:

1. Rename `middleware.ts` → `proxy.ts` (or `.js`)
2. Change the export from `export function middleware(...)` to `export function proxy(...)`
3. Or use the codemod: `npx @next/codemod@canary middleware-to-proxy .`

See the [Next.js migration guide](https://nextjs.org/docs/messages/middleware-to-proxy) for more details.

## 📚 Examples

See the [example](./example) directory for a complete Next.js app demonstrating usage.

## 🔗 Links

- [npm package](https://www.npmjs.com/package/next-preview-qr)
- [GitHub repository](https://github.com/charlesaloaye/next-preview-qr)
- [Report a bug](https://github.com/charlesaloaye/next-preview-qr/issues)

---

Made with ❤️ for the Next.js community
