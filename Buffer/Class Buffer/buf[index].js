// Import the Buffer class from Node.js buffer module
const { Buffer } = require('node:buffer');

// Create a buffer containing ASCII values:
// 65 = A, 66 = B, 67 = C, 68 = D, 69 = E
const buf = Buffer.from([65, 66, 67, 68, 69]);

// Display the original buffer content
console.log('Original buffer:', buf);

// Convert the buffer to a UTF-8 string and display it
console.log('As text:', buf.toString());

// Access and display the first byte in the buffer
console.log('First byte:', buf[0]);

// Access and display the second byte in the buffer
console.log('Second byte:', buf[1]);

// Modify the first byte:
// 97 = lowercase 'a'
buf[0] = 97;

// Display the modified buffer
console.log('Modified buffer:', buf);

// Convert the modified buffer to text and display it
console.log('Modified text:', buf.toString());

// Try to access an invalid index (outside buffer length)
// Returns undefined
console.log('Invalid index:', buf[10]);

// Try to write to an invalid index
// This does nothing because the index is out of bounds
buf[10] = 120;

// Display the buffer after the invalid write attempt
console.log('Buffer after invalid write attempt:', buf);