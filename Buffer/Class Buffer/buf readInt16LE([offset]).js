// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Create a Buffer containing two bytes: 0x00 and 0x05
const buf = Buffer.from([0, 5]);

// Read a signed 16-bit integer in Little Endian format
// starting at offset 0
const value = buf.readInt16LE(0);

// Display the Buffer contents
console.log('Buffer:', buf);

// Display the integer value read from the Buffer
console.log('Read value:', value);

// Attempt to read a 16-bit integer starting at offset 1
// This will fail because there is only one byte left
try {
    console.log(buf.readInt16LE(1));
} catch (error) {
    // Print the error code
    console.error('Error:', error.code);

    // Print the detailed error message
    console.error(error.message);
}