// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Create a Buffer with 8 bytes
const buf = Buffer.from([
    0x78, 0x56, 0x34, 0x12,
    0xef, 0xcd, 0xab, 0x90
]);

// Read an unsigned 64-bit integer in Little Endian format
// starting at offset 0
const value = buf.readBigUInt64LE(0);

// Print the BigInt value
console.log('BigInt Value:', value);

// Convert the value to hexadecimal and print it
console.log('Hexadecimal:', '0x' + value.toString(16));