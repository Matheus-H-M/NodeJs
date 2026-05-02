// Import the Buffer class from Node.js buffer module
const { Buffer } = require('node:buffer');

// Define the desired size of the buffer
const size = 10;

try {

    // Allocate a buffer of 10 bytes WITHOUT initializing its memory
    // The contents may contain random (old) data
    const buf = Buffer.allocUnsafe(size);

    // Log a message indicating the buffer is uninitialized
    console.log('Uninitialized buffer:');

    // Print the raw buffer (contents are unpredictable)
    console.log(buf);

    // Fill the buffer with zeros to make it safe and predictable
    buf.fill(0);

    // Log a message after filling the buffer
    console.log('\nBuffer after fill(0):');

    // Print the buffer again (now all bytes are 0x00)
    console.log(buf);

} catch (err) {

    // Handle any errors (e.g., invalid size)
    console.error('Error creating buffer:', err.message);
}