// Allocate a 32-byte buffer without initializing its memory.
// The buffer may contain leftover data from previously used memory.
const unsafeBuffer = Buffer.allocUnsafe(32);

// Display the initial contents of the uninitialized buffer.
console.log("Initial contents (uninitialized memory):");
console.log(unsafeBuffer);

// Overwrite every byte in the buffer with zeros.
// This removes any leftover data and makes the buffer safe to read.
unsafeBuffer.fill(0);

// Display the buffer after it has been initialized with zeros.
console.log("\nAfter filling with zeros:");
console.log(unsafeBuffer);

// Write the string "Node.js" into the beginning of the buffer.
unsafeBuffer.write("Node.js");

// Display the buffer after writing the new data.
console.log("\nAfter writing 'Node.js':");
console.log(unsafeBuffer);

// Convert the buffer to a string and display the result.
console.log("As text:", unsafeBuffer.toString());