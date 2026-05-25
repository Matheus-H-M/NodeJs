// Create a Buffer with 8 bytes of allocated memory
const buffer = Buffer.alloc(8);

// Write a signed 64-bit BigInt value into the buffer
// using Little-Endian byte order starting at offset 0
buffer.writeBigInt64LE(-1234567890123456789n, 0);

// Read the signed 64-bit BigInt value from the buffer
// starting at offset 0
const value = buffer.readBigInt64LE(0);

// Print the raw buffer data
console.log("Buffer:", buffer);

// Print the value read from the buffer
console.log("Read value:", value);

// Print the data type of the returned value
console.log("Type:", typeof value);