const { Buffer } = require('node:buffer');

// Create a buffer containing 6 bytes
const buf = Buffer.from([0x12, 0x34, 0x56, 0x78, 0x90, 0xAB]);

// Read all 6 bytes starting at offset 0 as a signed big-endian integer
const value = buf.readIntBE(0, 6);

// Print the value in decimal format
console.log('Decimal value:', value);

// Print the value in hexadecimal format
console.log('Hexadecimal value:', value.toString(16));

// Read the first 2 bytes (0x12 0x34)
console.log('First 2 bytes:', buf.readIntBE(0, 2));

// Read the first 3 bytes (0x12 0x34 0x56)
console.log('First 3 bytes:', buf.readIntBE(0, 3));

// Read the first 4 bytes (0x12 0x34 0x56 0x78)
console.log('First 4 bytes:', buf.readIntBE(0, 4));

try {
    // This will throw an error because offset 1 + 6 bytes
    // exceeds the buffer length (6 bytes total)
    console.log(buf.readIntBE(1, 6));
} catch (err) {
    // Display error information
    console.error('Error:', err.code, err.message);
}