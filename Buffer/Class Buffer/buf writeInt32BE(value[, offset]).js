const { Buffer } = require('node:buffer'); // Import the Buffer class from the Node.js buffer module

// Allocate a Buffer with 8 bytes of memory
const buf = Buffer.alloc(8);

// Define two signed 32-bit integer values
const number1 = 123456789;
const number2 = -1000;

// Write the first integer to the buffer in Big-Endian format starting at byte 0
buf.writeInt32BE(number1, 0);

// Write the second integer to the buffer in Big-Endian format starting at byte 4
buf.writeInt32BE(number2, 4);

// Display the raw Buffer contents
console.log('Buffer:', buf);

// Display the Buffer as a hexadecimal string
console.log('Hex:', buf.toString('hex'));

// Read the first integer using Little-Endian format.
// Since it was written in Big-Endian format, this will produce a different value.
console.log('Number 1 (read as Little-Endian):', buf.readInt32LE(0));

// Read the second integer using Big-Endian format.
// This matches the write format, so the original value is returned.
console.log('Number 2 (read as Big-Endian):', buf.readInt32BE(4));