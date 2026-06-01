// Import the Buffer class from Node.js buffer module
const { Buffer } = require('node:buffer');

// Create a Buffer containing signed 8-bit integer values
const buf = Buffer.from([-10, 20, -30, 40]);

// Read and print the signed 8-bit integer at offset 0
console.log('Position 0:', buf.readInt8(0)); // -10

// Read and print the signed 8-bit integer at offset 1
console.log('Position 1:', buf.readInt8(1)); // 20

// Read and print the signed 8-bit integer at offset 2
console.log('Position 2:', buf.readInt8(2)); // -30

// Read and print the signed 8-bit integer at offset 3
console.log('Position 3:', buf.readInt8(3)); // 40

// Attempt to read beyond the end of the buffer
try {
    // Offset 4 does not exist because the buffer has only 4 bytes (0-3)
    console.log(buf.readInt8(4));
} catch (err) {
    // Handle the out-of-range error
    console.error('Error:', err.message);
}