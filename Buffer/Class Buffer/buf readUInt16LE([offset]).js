// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Create a Buffer containing 4 bytes:
// 0x12, 0x34, 0x56, and 0x78
const buf = Buffer.from([0x12, 0x34, 0x56, 0x78]);

// Read an unsigned 16-bit integer (2 bytes)
// using Little-Endian format starting at offset 0.
// Bytes read: 0x12 0x34 -> 0x3412
const valor1 = buf.readUInt16LE(0);

// Read an unsigned 16-bit integer starting at offset 1.
// Bytes read: 0x34 0x56 -> 0x5634
const valor2 = buf.readUInt16LE(1);

// Read an unsigned 16-bit integer starting at offset 2.
// Bytes read: 0x56 0x78 -> 0x7856
const valor3 = buf.readUInt16LE(2);

// Print the value read from offset 0
// in both decimal and hexadecimal formats
console.log('Offset 0:', valor1, `(0x${valor1.toString(16)})`);

// Print the value read from offset 1
// in both decimal and hexadecimal formats
console.log('Offset 1:', valor2, `(0x${valor2.toString(16)})`);

// Print the value read from offset 2
// in both decimal and hexadecimal formats
console.log('Offset 2:', valor3, `(0x${valor3.toString(16)})`);