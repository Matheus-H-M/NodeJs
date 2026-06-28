// Import the Buffer class from the Node.js buffer module.
const { Buffer } = require('node:buffer');

// Allocate a buffer with 16 bytes of memory.
const buf = Buffer.alloc(16);

// Write the double-precision floating-point number 123.456
// to the buffer starting at byte offset 0 (Little Endian).
buf.writeDoubleLE(123.456, 0);

// Write another double-precision floating-point number 789.123
// to the buffer starting at byte offset 8 (Little Endian).
buf.writeDoubleLE(789.123, 8);

// Display the raw contents of the buffer.
console.log('Buffer:', buf);

// Read the first double value from byte offset 0.
const value1 = buf.readDoubleLE(0);

// Read the second double value from byte offset 8.
const value2 = buf.readDoubleLE(8);

// Display the decoded values.
console.log('Value 1:', value1);
console.log('Value 2:', value2);