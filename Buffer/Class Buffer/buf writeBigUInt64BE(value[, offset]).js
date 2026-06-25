// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Create a buffer with 8 bytes of space
const buf = Buffer.alloc(8);

// Define a 64-bit unsigned integer using BigInt
const value = 12345678901234567890n;

// Write the BigInt value to the buffer in Big-Endian format
// starting at offset 0
const nextOffset = buf.writeBigUInt64BE(value, 0);

// Display the offset after writing (0 + 8 bytes = 8)
console.log('Next offset:', nextOffset);

// Display the raw buffer contents
console.log('Buffer:', buf);

// Read the 64-bit unsigned integer back from the buffer
const readValue = buf.readBigUInt64BE(0);

// Display the original value
console.log('Original value:', value);

// Display the value read from the buffer
console.log('Read value:', readValue);

// Verify that the written and read values are identical
console.log('Are they equal?', value === readValue);