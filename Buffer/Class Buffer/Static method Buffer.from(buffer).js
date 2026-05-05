// Import the Buffer class from Node.js buffer module
const { Buffer } = require('node:buffer');

// Create a buffer from a string
const buf1 = Buffer.from('buffer');

// Create a copy of the existing buffer
const buf2 = Buffer.from(buf1);

// Modify the first byte of the original buffer (0x61 = 'a')
buf1[0] = 0x61;

// Print both buffers as strings
console.log('buf1:', buf1.toString()); // Expected: "auffer"
console.log('buf2:', buf2.toString()); // Expected: "buffer"

// Demonstrate error handling
try {
    // Invalid input (not a Buffer, string, or array-like)
    const invalido = 123;

    // This will throw a TypeError
    Buffer.from(invalido);
} catch (err) {
    // Catch and print the error message
    console.error('Error:', err.message);
}