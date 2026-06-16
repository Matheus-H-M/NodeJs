// Import the Buffer class from Node.js's buffer module
const { Buffer } = require('node:buffer');

// Create a Buffer containing 8 bytes.
// Each pair of bytes represents a 16-bit unsigned integer.
const buf = Buffer.from([
    0x12, 0x34, // First 16-bit value: 0x1234
    0x56, 0x78, // Second 16-bit value: 0x5678
    0x9A, 0xBC, // Third 16-bit value: 0x9ABC
    0xDE, 0xF0  // Fourth 16-bit value: 0xDEF0
]);

// Display the buffer before swapping the byte order
console.log('Before swap16():');
console.log(buf);

// Swap the byte order of each 16-bit value in-place.
// Example: 0x12 0x34 becomes 0x34 0x12
buf.swap16();

// Display the buffer after swapping the byte order
console.log('\nAfter swap16():');
console.log(buf);