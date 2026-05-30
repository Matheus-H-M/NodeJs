// Import the Buffer class from the Node.js buffer module
const { Buffer } = require('node:buffer');

// Allocate a buffer with 6 bytes of memory
const buf = Buffer.alloc(6);

// Store the hexadecimal value 0xAA in the first byte (index 0)
buf[0] = 0xAA;

// Store the hexadecimal value 0xBB in the second byte (index 1)
buf[1] = 0xBB;

// Write the 32-bit floating-point number 10.5 in Big-Endian format
// starting at byte offset 2
buf.writeFloatBE(10.5, 2);

// Read a 32-bit floating-point number in Big-Endian format
// starting at byte offset 2
const numero = buf.readFloatBE(2);

// Display the value that was read from the buffer
console.log('Read number:', numero);