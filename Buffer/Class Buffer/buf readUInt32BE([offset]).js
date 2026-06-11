// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Create a buffer containing 8 bytes
const buf = Buffer.from([
    0x12, 0x34, 0x56, 0x78,
    0x9A, 0xBC, 0xDE, 0xF0
]);

// Read an unsigned 32-bit integer in Little-Endian format
// starting at byte offset 0
const value1 = buf.readUInt32LE(0);

// Read an unsigned 32-bit integer in Big-Endian format
// starting at byte offset 4
const value2 = buf.readUInt32BE(4);

// Print the first value in decimal format
console.log('Value 1 (decimal):', value1);

// Print the first value in hexadecimal format
console.log('Value 1 (hex):', value1.toString(16));

// Print the second value in decimal format
console.log('Value 2 (decimal):', value2);

// Print the second value in hexadecimal format
console.log('Value 2 (hex):', value2.toString(16));