// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Create a Buffer containing 16 bytes (2 blocks of 64 bits / 8 bytes each)
const buf = Buffer.from([
    0x01, 0x02, 0x03, 0x04,
    0x05, 0x06, 0x07, 0x08,
    0x11, 0x12, 0x13, 0x14,
    0x15, 0x16, 0x17, 0x18
]);

// Display the original buffer contents
console.log('Before swap64():', buf);

// Reverse the byte order of each 64-bit (8-byte) block in-place
// First block:
// 01 02 03 04 05 06 07 08
// becomes:
// 08 07 06 05 04 03 02 01
//
// Second block:
// 11 12 13 14 15 16 17 18
// becomes:
// 18 17 16 15 14 13 12 11
buf.swap64();

// Display the modified buffer after the byte swap
console.log('After swap64():', buf);