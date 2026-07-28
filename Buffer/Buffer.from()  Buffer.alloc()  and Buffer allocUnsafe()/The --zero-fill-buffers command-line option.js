// Display a title indicating that an unsafe buffer will be created.
console.log("Buffer.allocUnsafe(10):");

// Create a 10-byte buffer without initializing its memory.
// The contents may contain leftover data unless Node.js is started
// with the --zero-fill-buffers flag.
const unsafeBuffer = Buffer.allocUnsafe(10);

// Print the contents of the unsafe buffer.
console.log(unsafeBuffer);

// Print a blank line followed by a title for the safe buffer example.
console.log("\nBuffer.alloc(10):");

// Create a 10-byte buffer that is automatically initialized with zeros.
const safeBuffer = Buffer.alloc(10);

// Print the contents of the safe buffer.
console.log(safeBuffer);