// Import the Buffer class from the built-in 'node:buffer' module.
const { Buffer } = require('node:buffer');

// Allocate a Buffer with 4 bytes, initialized with zeros.
const buf = Buffer.alloc(4);

// Write the signed 16-bit integer 258 (0x0102) at byte offset 0
// using big-endian byte order.
buf.writeInt16BE(258, 0);

// Write the signed 16-bit integer -2 at byte offset 2
// using big-endian byte order.
buf.writeInt16BE(-2, 2);

// Display the raw Buffer contents.
console.log('Buffer:', buf);

// Display the Buffer contents as a hexadecimal string.
console.log('Hex:', buf.toString('hex'));

// Read the first signed 16-bit big-endian integer from offset 0.
console.log('Value 1:', buf.readInt16BE(0));

// Read the second signed 16-bit big-endian integer from offset 2.
console.log('Value 2:', buf.readInt16BE(2));