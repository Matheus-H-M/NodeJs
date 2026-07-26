// Import the buffer constants object from the Node.js buffer module
const { constants } = require("buffer");

// Display the maximum string length supported by the JavaScript engine
console.log("Maximum allowed string length:");
console.log(constants.MAX_STRING_LENGTH);

// Create a sample string
const text = "Hello, Node.js!";

// Display the current string length (measured in UTF-16 code units)
console.log("\nCurrent string length (UTF-16):", text.length);

// Check whether the string is within the maximum allowed length
if (text.length <= constants.MAX_STRING_LENGTH) {
    console.log("The string is within the allowed limit.");
} else {
    console.log("The string exceeds the allowed limit.");
}

// Attempt to create a string larger than the maximum allowed length
try {
    // Set the desired size to one character beyond the limit
    const size = constants.MAX_STRING_LENGTH + 1;

    console.log(`\nAttempting to create a string with ${size} characters...`);

    // This should throw a RangeError because the string is too large
    const huge = "A".repeat(size);

    // This line will only execute if the string is created successfully
    console.log("String created successfully:", huge.length);
} catch (err) {
    // Handle the error thrown when the string exceeds the maximum length
    console.error("Failed to create the string.");
    console.error(err.name + ":", err.message);
}