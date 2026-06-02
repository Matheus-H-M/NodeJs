// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Create a Buffer containing two signed 16-bit integers in big-endian format:
// 0x0005 = 5
// 0xFFFB = -5 (stored using two's complement)
const buf = Buffer.from([
    0x00, 0x05,
    0xFF, 0xFB
]);

// Read a signed 16-bit big-endian integer starting at offset 0
// Reads bytes: 0x00 0x05 -> 5
const value1 = buf.readInt16BE(0);

// Read a signed 16-bit big-endian integer starting at offset 2
// Reads bytes: 0xFF 0xFB -> -5
const value2 = buf.readInt16BE(2);

// Print the first value to the console
console.log('Value 1:', value1);

// Print the second value to the console
console.log('Value 2:', value2);