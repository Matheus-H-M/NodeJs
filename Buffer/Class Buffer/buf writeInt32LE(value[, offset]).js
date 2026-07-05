// Import the Buffer class from the Node.js buffer module.
const { Buffer } = require('node:buffer');

// Allocate a buffer with 8 bytes initialized to zero.
const buf = Buffer.alloc(8);

// Write a signed 32-bit integer in Little Endian format
// at the beginning of the buffer (offset defaults to 0).
// The method returns the next available offset (4).
let offset = buf.writeInt32LE(0x05060708);

console.log('Next offset:', offset);

// Write another signed 32-bit integer starting at the
// offset returned by the previous write operation.
offset = buf.writeInt32LE(123456789, offset);

console.log('Next offset:', offset);

// Display the raw contents of the buffer.
console.log('Buffer:', buf);

// Display the buffer as a hexadecimal string.
// Note: "hex" must be lowercase.
console.log('Hex:', buf.toString('hex'));

// Read the first signed 32-bit integer from offset 0.
// Note: The original code had a typo (bufreadInt32LE).
console.log('First value:', buf.readInt32LE(0));

// Read the second signed 32-bit integer from offset 4.
console.log('Second value:', buf.readInt32LE(4));