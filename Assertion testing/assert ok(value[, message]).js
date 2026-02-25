// Import the built-in Node.js strict assert module
const assert = require('node:assert/strict');

// These assertions will PASS because the values are truthy
assert.ok(true);              // true is truthy
assert.ok(1);                 // 1 is truthy
assert.ok("texto");           // Non-empty string is truthy
assert.ok([1, 2, 3]);         // Non-empty array is truthy

// Log success message if all truthy tests pass
console.log("Truthy tests passed successfully!");

// This block tests a falsy value (false)
try {
    // This will throw an AssertionError with a custom message
    assert.ok(false, "The value must be true!");
} catch (error) {
    // Catch and display the custom error message
    console.error("Custom error:");
    console.error(error.message);
}

// This block tests calling assert.ok() with no arguments
try {
    // This will throw an AssertionError:
    // "No value argument passed to `assert.ok()`"
    assert.ok();
} catch (error) {
    // Catch and display the error message
    console.error("Error without argument:");
    console.error(error.message);
}

// This block tests a falsy expression
try {
    // 2 + 2 === 5 evaluates to false, so this throws an AssertionError
    assert.ok(2 + 2 === 5);
} catch (error) {
    // Catch and display the generated error message
    console.error("Error in invalid expression:");
    console.error(error.message);
}