// Import the Buffer class from Node.js's built-in buffer module
const { Buffer } = require('node:buffer');

// Allocate a buffer with 4 bytes of memory
const buf = Buffer.alloc(4);

// Write the 32-bit floating-point value 3.14 to the buffer
// using little-endian byte order, starting at offset 0
buf.writeFloatLE(3.14, 0);

// Read a 32-bit floating-point value from the buffer
// using little-endian byte order, starting at offset 0
const value = buf.readFloatLE(0);

// Print the raw buffer contents
console.log('Buffer:', buf);

// Print the float value that was read from the buffer
console.log('Read value:', value);

try {
    // Attempt to read a float starting at offset 1
    // This will fail because a float requires 4 bytes,
    // and there are not enough bytes available from offset 1
    buf.readFloatLE(1);
} catch (err) {
    // Print information about the error
    console.error('Error:', err.code, err.message);
}