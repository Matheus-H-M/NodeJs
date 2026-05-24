// Import Buffer from Node.js
const { Buffer } = require('node:buffer');

// Create a buffer with 8 bytes
const buf = Buffer.alloc(8);

// Write a signed 64-bit BigInt in Big-Endian format
buf.writeBigInt64BE(1234567890123456789n, 0);

// Read the signed 64-bit BigInt from the buffer
const value = buf.readBigInt64BE(0);

// Display the buffer content in hexadecimal
console.log('Buffer (hex):', buf.toString('hex'));

// Display the value read from the buffer
console.log('Read BigInt value:', value);

// Example with a negative number (two’s complement)
const negativeBuf = Buffer.alloc(8);

// Write a negative signed BigInt
negativeBuf.writeBigInt64BE(-5000n, 0);

// Read the negative value
const negativeValue = negativeBuf.readBigInt64BE(0);

console.log('Negative buffer (hex):', negativeBuf.toString('hex'));
console.log('Read negative BigInt value:', negativeValue);