// Import the built-in Node.js buffer module.
const buffer = require('node:buffer');

// Display the maximum size allowed for a single Buffer instance.
console.log('buffer.kMaxLength:', buffer.kMaxLength);

// Display the equivalent constant value.
console.log('buffer.constants.MAX_LENGTH:', buffer.constants.MAX_LENGTH);

// Verify that buffer.kMaxLength is an alias of buffer.constants.MAX_LENGTH.
console.log(
    'Are they equal?',
    buffer.kMaxLength === buffer.constants.MAX_LENGTH
);

// Allocate a Buffer with a size of 1024 bytes.
const buf = Buffer.alloc(1024);

// Display the size of the allocated Buffer.
console.log('Buffer created with', buf.length, 'bytes');

// Attempt to allocate a Buffer larger than the maximum allowed size.
try {
    Buffer.alloc(buffer.kMaxLength + 1);
} catch (err) {
    // Print the error message when the allocation exceeds the limit.
    console.error('Error creating Buffer:', err.message);
}