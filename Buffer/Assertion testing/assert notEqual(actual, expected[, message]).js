// Import the built-in Node.js assert module
const assert = require('node:assert');

// First test case
try {
    // Check that 5 is NOT equal to 10 (uses != comparison)
    // This should pass because 5 != 10
    assert.notEqual(5, 10);

    // If no error is thrown, this message will be displayed
    console.log('Test 1 passed: 5 is different from 10');
} catch (error) {
    // If the assertion fails, the error message will be displayed here
    console.error("Test 1 failed:", error.message);
}

// Second test case
try {
    // Check that 7 is NOT equal to 7
    // This will fail because 7 == 7
    assert.notEqual(7, 7);

    console.log("Test 2 passed");
} catch (error) {
    // The assertion throws an AssertionError
    console.error("Test 2 failed:", error.message);
}

// Third test case
try {
    // Check that 1 is NOT equal to "1"
    // This will fail because notEqual uses != (loose comparison)
    // In loose comparison, 1 == "1" is true
    assert.notEqual(1, "1");

    console.log("Test 3 passed");
} catch (error) {
    console.error("Test 3 failed:", error.message);
}

// Fourth test case with a custom error message
try {
    // Check that "abc" is NOT equal to "abc"
    // This will fail because both values are identical
    // A custom message is provided as the third parameter
    assert.notEqual("abc", "abc", "Values must not be equal!");
} catch (error) {
    // The custom message will appear in the error output
    console.error("Test 4 failed:", error.message);
}