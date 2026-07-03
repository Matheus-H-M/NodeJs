// Import the Buffer class from the Node.js buffer module.
const { Buffer } = require('node:buffer');

// Allocate a Buffer with 6 bytes, initialized to 0.
// Each Int16 value uses 2 bytes, so we need 6 bytes for 3 values.
const buf = Buffer.alloc(6);

// Write the signed 16-bit integer 1000 at offset 0 (Little-Endian).
buf.writeInt16LE(1000, 0);

// Write the signed 16-bit integer -500 at offset 2 (Little-Endian).
buf.writeInt16LE(-500, 2);

// Write the signed 16-bit integer 32767 (maximum Int16 value)
// at offset 4 (Little-Endian).
buf.writeInt16LE(32767, 4);

// Display the raw Buffer contents.
console.log('Buffer:', buf);

// Read and display the first Int16 value from offset 0.
console.log('Value 1:', buf.readInt16LE(0));

// Read and display the second Int16 value from offset 2.
console.log('Value 2:', buf.readInt16LE(2));

// Read and display the third Int16 value from offset 4.
console.log('Value 3:', buf.readInt16LE(4));

// Display each byte of the Buffer as a two-digit hexadecimal value.
console.log(
    'Bytes:',
    [...buf].map(b => b.toString(16).padStart(2, '0')).join(' ')
);