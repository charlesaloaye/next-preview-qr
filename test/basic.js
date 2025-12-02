const { getLocalIP } = require('../src/ip');
const { generateQRDataURI } = require('../src/qr');

async function runTests() {
  console.log('Running basic tests...\n');
  
  let passed = 0;
  let failed = 0;
  
  // Test 1: IP detection
  console.log('Test 1: IP detection');
  try {
    const ip = getLocalIP();
    if (typeof ip === 'string' || ip === null) {
      console.log('✓ IP detection returns string or null');
      passed++;
    } else {
      throw new Error('IP detection should return string or null');
    }
  } catch (err) {
    console.log('✗ IP detection failed:', err.message);
    failed++;
  }
  
  // Test 2: QR code generation
  console.log('\nTest 2: QR code generation');
  try {
    const testUrl = 'http://localhost:3000';
    const dataURI = await generateQRDataURI(testUrl);
    if (typeof dataURI === 'string' && dataURI.startsWith('data:image/png;base64,')) {
      console.log('✓ QR code generation returns valid data URI');
      passed++;
    } else {
      throw new Error('QR code should return data URI string');
    }
  } catch (err) {
    console.log('✗ QR code generation failed:', err.message);
    failed++;
  }
  
  // Summary
  console.log('\n' + '='.repeat(40));
  console.log(`Tests passed: ${passed}`);
  console.log(`Tests failed: ${failed}`);
  console.log('='.repeat(40));
  
  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('\n✓ All tests passed!');
  }
}

runTests().catch((err) => {
  console.error('Test runner error:', err);
  process.exit(1);
});

