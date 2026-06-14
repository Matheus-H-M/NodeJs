// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Create a buffer containing 6 bytes in hexadecimal format
const buf = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x90, 0xab]);

// Read 6 bytes starting at offset 0 as an unsigned little-endian integer
const fullValue = buf.readUIntLE(0, 6);

// Display the value in decimal format
console.log('Decimal value:', fullValue);

// Display the value in hexadecimal format
console.log('Hexadecimal value:', fullValue.toString(16));

// Read the first 2 bytes as an unsigned big-endian integer
// Note: readUInt16BE() always reads exactly 2 bytes.
// The extra argument (3) is ignored.
const firstTwoBytes = buf.readUInt16BE(0);

// Print a section header
console.log('\nFirst 2 bytes:');

// Display the value in decimal format
console.log('Decimal:', firstTwoBytes);

// Display the value in hexadecimal format
console.log('Hexadecimal:', firstTwoBytes.toString(16));

// Read 2 bytes starting at offset 2 as an unsigned little-endian integer
const valueFromOffset2 = buf.readUIntLE(2, 2);

// Print a section header
console.log('\n2 bytes starting at offset 2:');

// Display the value in decimal format
console.log('Decimal:', valueFromOffset2);

// Display the value in hexadecimal format
console.log('Hexadecimal:', valueFromOffset2.toString(16));