// Import the built-in Node.js 'buffer' module.
const buffer = require('node:buffer');

// Print the maximum length allowed for a single JavaScript string.
console.log('buffer.kStringMaxLength:', buffer.kStringMaxLength);

// Print the same maximum string length using the constants object.
// buffer.kStringMaxLength is an alias for buffer.constants.MAX_STRING_LENGTH.
console.log(
    "buffer.constants.MAX_STRING_LENGTH:",
    buffer.constants.MAX_STRING_LENGTH
);

// Verify that both properties contain the same value.
console.log(
    "Are they equal?",
    buffer.kStringMaxLength === buffer.constants.MAX_STRING_LENGTH
);

try {
    // Create a sample string.
    const str = "Hello, Node.js!";

    // Print the string value.
    console.log(`String: "${str}"`);

    // Print the number of characters in the string.
    console.log(`String length: ${str.length}`);
} catch (err) {
    // Handle any unexpected errors.
    console.error(err);
}