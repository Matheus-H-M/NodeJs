// Import the Buffer class from Node.js buffer module
const { Buffer } = require('node:buffer');

// Create a buffer of size 5, filled with zeros by default
const buf1 = Buffer.alloc(5);
// Log the buffer contents
console.log('buf1:', buf1)

// Create a buffer of size 5, filled with the character 'a'
const buf2 = Buffer.alloc(5, 'a');
// Log the buffer contents
console.log('buf2:', buf2); // (fixed missing comma)

// Create a buffer of size 11, filled using a base64 encoded string
const buf3 = Buffer.alloc(11, 'aGVsbG8gd29ybGQ=', 'base64');
// Log the raw buffer
console.log('buf3:', buf3);
// Convert buffer to string (decoded text) and log it
console.log('Decoded text:', buf3.toString());

// Try to create a buffer with invalid size (-1)
try {
    const buf4 = Buffer.alloc(-1);
} catch (err) {
    // Catch and log the error message
    console.error('Error:', err.message);
}
