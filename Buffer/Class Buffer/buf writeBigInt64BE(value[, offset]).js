// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Allocate a buffer with 16 bytes initialized to zero
const buf = Buffer.alloc(16);

// Create a BigInt value to be stored in the buffer
const value = 1234567890123456789n;

// Write the BigInt as a signed 64-bit integer in Big-Endian format
// starting at offset 0
const nextOffset = buf.writeBigInt64BE(value, 0);

// Display the offset returned after writing (offset + 8 bytes)
console.log('Next offset:', nextOffset);

// Display the raw contents of the buffer
console.log('Buffer:', buf);

// Read the signed 64-bit BigInt from the buffer starting at offset 0
const readValue = buf.readBigInt64BE(0);

// Display the value that was read from the buffer
console.log('Read value:', readValue);