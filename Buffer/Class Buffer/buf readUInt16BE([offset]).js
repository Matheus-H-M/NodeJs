// Import the Buffer class from Node.js's built-in buffer module
const { Buffer } = require('node:buffer');

// Create a buffer containing four bytes:
// 0xAB, 0xCD, 0x12, and 0x34
const buf = Buffer.from([0xAB, 0xCD, 0x12, 0x34]);

// Read an unsigned 16-bit integer in Big-Endian format
// starting at offset 0.
// Bytes read: 0xAB 0xCD
// Result: 0xABCD (43981 in decimal)
const value1 = buf.readUInt16BE(0);

// Read another unsigned 16-bit integer in Big-Endian format
// starting at offset 2.
// Bytes read: 0x12 0x34
// Result: 0x1234 (4660 in decimal)
const value2 = buf.readUInt16BE(2);

// Print the first value in decimal format
console.log('Value 1 (decimal):', value1);

// Print the first value in hexadecimal format
console.log('Value 1 (hex):', value1.toString(16));

// Print the second value in decimal format
console.log('Value 2 (decimal):', value2);

// Print the second value in hexadecimal format
console.log('Value 2 (hex):', value2.toString(16));