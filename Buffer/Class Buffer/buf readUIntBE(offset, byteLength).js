// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Create a buffer containing 6 bytes of hexadecimal data
const buf = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x90, 0xAB]);

// Read 4 bytes starting at offset 0 as an unsigned Big-Endian integer
const value4Bytes = buf.readUIntBE(0, 4);

// Print the value in decimal format
console.log('Decimal:', value4Bytes);

// Convert the value to hexadecimal and print it
console.log('Hexadecimal:', value4Bytes.toString(16));

// Read 6 bytes starting at offset 0 as an unsigned Big-Endian integer
// readUintBE() is an alias of readUIntBE()
const value6Bytes = buf.readUintBE(0, 6);

// Print the 6-byte value in decimal format
console.log('Decimal (6 bytes):', value6Bytes);

// Convert the 6-byte value to hexadecimal and print it
console.log('Hexadecimal (6 bytes):', value6Bytes.toString(16));