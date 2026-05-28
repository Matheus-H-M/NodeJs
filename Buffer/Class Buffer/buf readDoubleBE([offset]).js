// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Create a buffer containing 8 bytes
// These bytes represent a 64-bit double value in Big-Endian format
const buf = Buffer.from([64, 9, 33, 251, 84, 68, 45, 24]);

// Read a 64-bit double from the buffer starting at offset 0
const numero = buf.readDoubleBE(0);

// Print the decoded number to the console
console.log('Read value:', numero);