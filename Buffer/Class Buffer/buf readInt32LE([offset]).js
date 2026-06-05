// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Create a Buffer containing 4 bytes
// The bytes are stored in little-endian order
const buf = Buffer.from([0x78, 0x56, 0x34, 0x12]);

// Read a signed 32-bit integer from the buffer
// starting at offset 0 using little-endian byte order
const value = buf.readInt32LE(0);

// Print the raw buffer contents
console.log('Buffer:', buf);

// Print the integer value that was read
console.log('Read value:', value);