// Display the default Buffer pool size
console.log("Default Buffer.poolSize:", Buffer.poolSize);

// Change the internal buffer pool size to 16 KB
Buffer.poolSize = 16 * 1024;

// Display the new Buffer pool size
console.log("New Buffer.poolSize:", Buffer.poolSize);

// Create an array to store buffers
const buffers = [];

// Create 5 small buffers
for (let i = 0; i < 5; i++) {

  // Allocate an unsafe buffer with 1024 bytes
  const buf = Buffer.allocUnsafe(1024);

  // Fill the buffer with the current index value
  buf.fill(i);

  // Store the buffer in the array
  buffers.push(buf);

  // Print the size of the created buffer
  console.log(`Buffer ${i} created with size:`, buf.length);
}

// Write text into the first buffer
buffers[0].write("Hello Node.js");

// Display a message before reading the buffer
console.log("Contents of the first buffer:");

// Convert part of the buffer to a UTF-8 string and print it
console.log(buffers[0].toString("utf8", 0, 13));