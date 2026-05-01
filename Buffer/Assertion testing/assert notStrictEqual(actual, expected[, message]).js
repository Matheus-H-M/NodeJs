// Import the strict version of Node.js assert module
const assert = require('node:assert/strict');

// Test 1: Values are different (10 !== 20)
// This test should PASS because the values are not strictly equal
try {
    assert.notStrictEqual(10, 20);
    console.log('Test 1 passed');
} catch (error) {
    // This block will only run if the assertion fails
    console.error('Test 1 failed', error.message);
}

// Test 2: Values are equal (5 === 5)
// This test should FAIL because the values are strictly equal
try {
    assert.notStrictEqual(5, 5);
    console.log('Test 2 passed');
} catch (error) {
    // This block runs because an AssertionError is thrown
    console.error("Test 2 failed");
    console.error(error.name);    // Prints the error type (AssertionError)
    console.error(error.message); // Prints the default error message
}

// Test 3: Equal strings with custom message
// This test should FAIL and display the custom message
try {
    assert.notStrictEqual('abc', "abc", "Values should not be equal!");
} catch (error) {
    // The custom message will be shown here
    console.error('Test 3 failed');
    console.error(error.message);
}

// Test 4: Passing a custom Error object
// If values are equal, this custom Error is thrown instead of AssertionError
try {
    assert.notStrictEqual(true, true, new Error('Custom error thrown!'));
} catch (error) {
    console.error("Test 4 failed");
    console.error(error.message); // Displays "Custom error thrown!"
}