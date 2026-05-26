// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Create a buffer containing 8 bytes
const buf = Buffer.from([
    0x00, 0x00, 0x00, 0x01,
    0x23, 0x45, 0x67, 0x89
]);

// Read an unsigned 64-bit Big Endian integer starting at offset 0
const value = buf.readBigUInt64BE(0);

// Print the value to the console
console.log('Read value:', value);

// Create another buffer with extra bytes at the beginning
const buf2 = Buffer.from([
    0xaa, 0xbb, // bytes that will be skipped
    0x00, 0x00, 0x00, 0x00,
    0xff, 0xff, 0xff, 0xff
]);

// Read an unsigned 64-bit Big Endian integer starting at offset 2
const number = buf2.readBigUInt64BE(2);

// Print the second value to the console
console.log('Number with offset:', number);