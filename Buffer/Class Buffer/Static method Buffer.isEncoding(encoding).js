// Import the Buffer module from Node.js
const { Buffer } = require('node:buffer');

// Array containing different encoding names to test
const encodings = [

    // Valid UTF-8 encoding
    'utf8',

    // Valid hexadecimal encoding
    'hex',

    // Valid Base64 encoding
    'base64',

    // Valid ASCII encoding
    'ascii',

    // Valid Latin-1 encoding
    'latin1',

    // Invalid encoding format
    'utf/8',

    // Empty string (invalid encoding)
    '',

    // Unknown encoding name
    'unknown'
];

// Function that checks if an encoding is supported
function checkEncoding(encoding) {

    // Verify if the encoding exists in Node.js
    if (Buffer.isEncoding(encoding)) {

        // Print success message for valid encodings
        console.log(`"${encoding}" is a supported encoding ☑️`);

    } else {

        // Print error message for invalid encodings
        console.log(`"${encoding}" is NOT a supported encoding ❌`);
    }
}

// Execute the function for every encoding in the array
encodings.forEach(checkEncoding);