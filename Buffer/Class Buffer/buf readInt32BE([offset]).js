// Import the Buffer class from Node.js's built-in buffer module
const { Buffer } = require('node:buffer');

// Create a Buffer containing 8 bytes
// First 4 bytes:  0x00000005 = 5
// Second 4 bytes: 0xFFFFFFFB = -5 (two's complement representation)
const buf = Buffer.from([
    0x00, 0x00, 0x00, 0x05,
    0xFF, 0xFF, 0xFF, 0xFB
]);

// Read a signed 32-bit big-endian integer starting at byte offset 0
// Bytes: 00 00 00 05
// Result: 5
const value1 = buf.readInt32BE(0);

// Read a signed 32-bit big-endian integer starting at byte offset 4
// Bytes: FF FF FF FB
// Result: -5
const value2 = buf.readInt32BE(4);

// Print the first value to the console
console.log('Value 1:', value1);

// Print the second value to the console
console.log('Value 2:', value2);