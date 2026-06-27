// Import the Buffer class from the Node.js buffer module.
const { Buffer } = require('node:buffer');

// Allocate a buffer with 16 bytes of memory.
// Each Double (64-bit floating-point number) requires 8 bytes,
// so this buffer can store two Double values.
const buf = Buffer.alloc(16);

// Initialize the write offset.
// This indicates the position where the next value will be written.
let offset = 0;

// Write the first Double value (123.456) in Big-Endian format.
// The method returns the next available offset (8).
offset = buf.writeDoubleBE(123.456, offset);

// Write the second Double value (-987.654) in Big-Endian format.
// This starts at byte 8 and returns the next offset (16).
offset = buf.writeDoubleBE(-987.654, offset);

// Display the raw contents of the buffer.
console.log('Buffer:', buf);

// Display the final offset after writing both values.
console.log('Final offset:', offset);

// Read the first Double value from byte 0.
const value1 = buf.readDoubleBE(0);

// Read the second Double value from byte 8.
const value2 = buf.readDoubleBE(8);

// Display the first value read from the buffer.
console.log('First value:', value1);

// Display the second value read from the buffer.
console.log('Second value:', value2);