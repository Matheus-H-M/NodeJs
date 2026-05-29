// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Create a buffer with 8 bytes
const buf = Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]);

try {

    // Read a 64-bit double (little-endian) starting at offset 0
    const value = buf.readDoubleLE(0);

    // Print the value read from the buffer
    console.log('Read value:', value);

} catch (error) {

    // Print an error message if reading fails
    console.error('Error reading the buffer:', error.message);
}

try {

    // Attempt to read starting at offset 1
    // This will fail because there are not enough bytes
    console.log(buf.readDoubleLE(1));

} catch (error) {

    // Print the error code and message
    console.error('Error:', error.code, '-', error.message);
}