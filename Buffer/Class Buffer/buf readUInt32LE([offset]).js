// Import the Buffer class from Node.js's buffer module
const { Buffer } = require('node:buffer');

// Create a buffer containing 8 bytes
// The first 4 bytes represent 0x12345678 in Little Endian format
// The next 4 bytes represent 0x90ABCDEF in Little Endian format
const buf = Buffer.from([
    0x78, 0x56, 0x34, 0x12,
    0xEF, 0xCD, 0xAB, 0x90
]);

// Read an unsigned 32-bit integer (Little Endian)
// starting at byte offset 0
const value1 = buf.readUInt32LE(0);

// Read another unsigned 32-bit integer (Little Endian)
// starting at byte offset 4
const value2 = buf.readUInt32LE(4);

// Print the first value in decimal format
console.log('Value 1 (decimal):', value1);

// Print the first value in hexadecimal format
console.log('Value 1 (hex):', '0x' + value1.toString(16));

// Print the second value in decimal format
console.log('Value 2 (decimal):', value2);

// Print the second value in hexadecimal format
console.log('Value 2 (hex):', '0x' + value2.toString(16));