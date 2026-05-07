// Import the Buffer class from the Node.js buffer module
const { Buffer } = require('node:buffer');

// Create a text string
const texto = 'Olá Node.js 🚀';

// Create a Buffer from the string using UTF-8 encoding by default
const bufferUtf8 = Buffer.from(texto);

// Print the original text
console.log('Original text:');
console.log(texto);

// Convert the Buffer content to hexadecimal format and print it
console.log('\nBuffer in hexadecimal:');
console.log(bufferUtf8.toString('hex'));

// Convert the Buffer back to a UTF-8 string and print it
console.log('\nConverting Buffer back to UTF-8 string:');
console.log(bufferUtf8.toString('utf8'));

// Create a Buffer from a hexadecimal string
const bufferHex = Buffer.from(
  '4f6cc3a1204e6f64652e6a7320f09f9a80',
  'hex'
);

// Print the decoded content from the hexadecimal Buffer
console.log('\nBuffer created using HEX:');
console.log(bufferHex.toString());

// Read the UTF-8 buffer using latin1 encoding
console.log('\nReading using latin1:');
console.log(bufferUtf8.toString('latin1'));

// Try to create a Buffer using an invalid value
try {

    // This will throw an error because the argument is not valid
    Buffer.from(12345);

} catch (error) {

    // Print a custom error message
    console.log('\nCaptured error:');

    // Print the actual error message
    console.log(error.message);
}