// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Allocate a new Buffer with 4 bytes, initialized to zero
const buf = Buffer.alloc(4);

// Write the maximum signed 8-bit integer (127) at byte offset 0
buf.writeInt8(127, 0);

// Write a signed 8-bit integer at byte offset 1
// WARNING: -1238 is outside the valid Int8 range (-128 to 127).
// According to the Node.js documentation, the behavior is undefined.
buf.writeInt8(-1238, 1);

// Write the positive value 25 at byte offset 2
buf.writeInt8(25, 2);

// Write the negative value -25 at byte offset 3
buf.writeInt8(-25, 3);

// Display the raw Buffer contents
console.log('Buffer:', buf);

// Display the Buffer as a hexadecimal string
console.log('Hex:', buf.toString('hex'));

// Read and display each signed 8-bit integer stored in the Buffer
console.log('Read values:');
console.log('Offset 0:', buf.readInt8(0));
console.log('Offset 1:', buf.readInt8(1));
console.log('Offset 2:', buf.readInt8(2));
console.log('Offset 3:', buf.readInt8(3));