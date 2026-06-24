// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Allocate a buffer with 8 bytes
// 8 bytes are required to store a signed 64-bit integer (BigInt)
const buf = Buffer.alloc(8);

// Define a BigInt value to be written into the buffer
const value = 0x0102030405060708n;

// Write the BigInt value to the buffer using little-endian byte order
// Returns the number of bytes written plus the starting offset
const bytesWritten = buf.writeBigInt64LE(value);

// Display the number of bytes written
console.log('Bytes written:', bytesWritten);

// Display the raw buffer contents
console.log('Buffer:', buf);

// Display the buffer contents as a hexadecimal string
console.log('Hex:', buf.toString('hex'));