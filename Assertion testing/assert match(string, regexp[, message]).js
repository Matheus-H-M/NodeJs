// Import the strict version of the built-in Node.js assert module
const assert = require('node:assert/strict');

// ------------------------------
// Example 1: Valid match
// ------------------------------
try {
    // Checks if the string matches the email regular expression pattern
    // If it matches, no error is thrown
    assert.match("Meu email é teste@email.com", /\S+@\S+\.\S+/);

    // If no error occurs, this message will be printed
    console.log('Valid email!');
} catch (error) {
    // If the assertion fails, the error message will be displayed
    console.error("Error:", error.message);
}

// ------------------------------
// Example 2: String does NOT match the RegExp
// ------------------------------
try {
    // This will fail because the string does not contain the word "pass"
    // The third argument is a custom error message
    assert.match('I will fail', /pass/, 'The string should contain the word "pass"');
} catch (error) {
    // The custom error message will be shown here
    console.error('Error:', error.message);
}

// ------------------------------
// Example 3: Invalid type (not a string)
// ------------------------------
try {
    // This will throw an error because the first argument must be a string
    assert.match(12345, /123/, 'The value must be a string');
} catch (error) {
    // Displays the type error message
    console.error("Error:", error.message);
}

// ------------------------------
// Example 4: Passing a custom Error object
// ------------------------------
try {
    // This will fail because the string does not contain "Python"
    // Instead of a default AssertionError, a custom Error object is thrown
    assert.match('Node.js is awesome', /Python/, new Error('The string does not contain "Python"'));
} catch (error) {
    // Displays the custom error message
    console.error('Custom error:', error.message);
}