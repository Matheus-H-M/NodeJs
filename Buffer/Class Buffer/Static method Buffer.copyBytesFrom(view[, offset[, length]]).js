// Create a Uint16Array with two elements: 0 and 65535 (0xffff)
const u16 = new Uint16Array([0, 0xffff]);

// Copy 1 element starting from index 1 into a new Buffer
// Since Uint16 uses 2 bytes per element, the resulting buffer will have 2 bytes
const buf = Buffer.copyBytesFrom(u16, 1, 1);

// Modify the original array to show that the buffer is independent
u16[1] = 0;

// Log the length of the buffer (should be 2 bytes)
console.log('Buffer length:', buf.length);

// Log individual bytes of the buffer
console.log('Byte 0:', buf[0]); // First byte
console.log('Byte 1:', buf[1]); // Second byte

// Create a Uint8Array with four elements
const u8 = new Uint8Array([10, 20, 30, 40]);

// Copy 2 elements starting from index 1 (values 20 and 30)
const buf2 = Buffer.copyBytesFrom(u8, 1, 2);

// Print a label for the next example
console.log('\nAnother example:');

// Log the buffer (will display in hexadecimal format)
console.log(buf2);

// Log first byte of the FIRST buffer (note: still refers to buf, not buf2)
console.log(buf[0]);

// Log second byte of the second buffer
console.log(buf2[1]);