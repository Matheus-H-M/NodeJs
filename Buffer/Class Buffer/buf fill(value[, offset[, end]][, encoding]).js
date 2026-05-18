// Import the Buffer module from Node.js
const { Buffer } = require('node:buffer');


// ==========================================
// Example 1 - Fill the entire buffer
// ==========================================

// Create a buffer with 10 bytes
const buffer1 = Buffer.alloc(10);

// Fill the entire buffer with the character 'A'
buffer1.fill('A');

// Display the raw buffer
console.log('Buffer 1:', buffer1);

// Convert buffer to string and display it
console.log('Text:', buffer1.toString());


// ==========================================
// Example 2 - Fill only part of the buffer
// ==========================================

// Create another buffer with 10 bytes
const buffer2 = Buffer.alloc(10);

// Fill the buffer with 'B'
// Start at index 2 and stop before index 7
buffer2.fill('B', 2, 7);

// Display the raw buffer
console.log('\nBuffer 2:', buffer2);

// Convert buffer to string and display it
console.log('Text:', buffer2.toString());


// ==========================================
// Example 3 - Fill buffer using a number
// ==========================================

// Create a buffer with 5 bytes
const buffer3 = Buffer.alloc(5);

// Fill all bytes with decimal value 255 (0xFF)
buffer3.fill(255);

// Display the buffer
console.log('\nBuffer 3:', buffer3);


// ==========================================
// Example 4 - Fill buffer using hexadecimal
// ==========================================

// Create a buffer with 6 bytes
const buffer4 = Buffer.alloc(6);

// Fill using hexadecimal value "aa"
buffer4.fill('aa', 'hex');

// Display the buffer
console.log('\nBuffer 4:', buffer4);


// ==========================================
// Example 5 - Multi-byte UTF-8 character
// ==========================================

// Create a buffer with 5 bytes
const buffer5 = Buffer.alloc(5);

// Fill buffer using a UTF-8 character
// This character uses multiple bytes
buffer5.fill('\u0222');

// Display the buffer
console.log('\nBuffer 5:', buffer5);


// ==========================================
// Example 6 - Empty string becomes 0x00
// ==========================================

// Create a buffer with 5 bytes
const buffer6 = Buffer.alloc(5);

// Filling with an empty string results in zeroed bytes
buffer6.fill('');

// Display the buffer
console.log('\nBuffer 6:', buffer6);


// ==========================================
// Example 7 - Invalid hexadecimal value
// ==========================================

try {

    // Create a buffer with 5 bytes
    const buffer7 = Buffer.alloc(5);

    // Attempt to fill using invalid hex characters
    buffer7.fill('zz', 'hex');

    // This line will not execute if an error occurs
    console.log(buffer7);

} catch (err) {

    // Display custom error message
    console.log('\nError detected:');

    // Display the actual error message
    console.log(err.message);
}