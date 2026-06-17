// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Create a Buffer containing 8 bytes (2 groups of 32 bits)
const buf = Buffer.from([
    0x11, 0x22, 0x33, 0x44, // First 32-bit block
    0xAA, 0xBB, 0xCC, 0xDD  // Second 32-bit block
]);

// Display the buffer before swapping the byte order
console.log('Before:', buf);

// Swap the byte order of each 32-bit (4-byte) block in-place
buf.swap32();

// Display the buffer after swapping the byte order
console.log('After:', buf);