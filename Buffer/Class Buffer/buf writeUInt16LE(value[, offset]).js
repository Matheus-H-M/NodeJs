// Import the Buffer class from the Node.js buffer module.
const { Buffer } = require('node:buffer');

// Allocate a new buffer with a size of 4 bytes.
const buf = Buffer.alloc(4);

// Write the unsigned 16-bit hexadecimal value 0x1234
// at offset 0 using Little Endian byte order.
buf.writeUInt16LE(0x1234, 0);

// Write the unsigned 16-bit hexadecimal value 0xABCD
// at offset 2 using Little Endian byte order.
buf.writeUInt16LE(0xABCD, 2);

// Display the raw buffer contents.
console.log('Buffer:', buf);

// Display the buffer as a hexadecimal string.
console.log('Hex:', buf.toString('hex'));

// Read the first 16-bit value from offset 0
// and print it in hexadecimal format.
console.log('Value 1:', buf.readInt16LE(0).toString(16));

// Read the second 16-bit value from offset 2
// and print it in hexadecimal format.
console.log('Value 2:', buf.readInt16LE(2).toString(16));