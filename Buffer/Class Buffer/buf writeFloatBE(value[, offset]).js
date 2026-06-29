// Import the Buffer class from the built-in Node.js buffer module.
const { Buffer } = require('node:buffer');

// Allocate a buffer with 8 bytes of memory.
// Each 32-bit floating-point number occupies 4 bytes,
// so this buffer can store two float values.
const buf = Buffer.alloc(8);

// Initialize the write offset.
// This indicates the position where the next value will be written.
let offset = 0;

// Write the first 32-bit floating-point number (Big-Endian)
// at the current offset (0). The method returns the next
// available offset, which is 4.
offset = buf.writeFloatBE(3.1415927, offset);

// Write the second 32-bit floating-point number (Big-Endian)
// starting at offset 4. The returned offset becomes 8.
offset = buf.writeFloatBE(-12.5, offset);

// Display the raw buffer contents.
console.log('Buffer:', buf);

// Display the buffer as a hexadecimal string.
console.log('Hex:', buf.toString('hex'));

// Read the first floating-point number from offset 0.
const value1 = buf.readFloatBE(0);

// Read the second floating-point number from offset 4.
const value2 = buf.readFloatBE(4);

// Display the first decoded float value.
console.log('Value 1:', value1);

// Display the second decoded float value.
console.log('Value 2:', value2);