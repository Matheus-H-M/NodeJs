// Import the strict version of Node.js assert module
const assert = require('node:assert/strict');

// Function to divide two numbers
function dividir(a, b) {

    // Check if both parameters are numbers
    if (typeof a !== 'number' || typeof b !== 'number') {

        // If not numbers, throw the provided TypeError
        // When passing an Error object, assert.fail throws it directly
        assert.fail(new TypeError('Parameters must be numbers'));
    }

    // Check if the divisor is zero
    if (b === 0) {

        // If dividing by zero, throw an AssertionError with a custom message
        assert.fail("Division by zero is not allowed");
    }

    // Return the result of the division
    return a / b;
}

// First test: division by zero
try {

    // This will trigger the "division by zero" assertion
    console.log(dividir(10, 0));

} catch (err) {

    // Catch and display the thrown error
    console.error("Caught error:", err);
}

// Second test: invalid parameter type
try {

    // This will trigger the TypeError assertion
    console.log(dividir("10", 2));

} catch (err) {

    // Catch and display the thrown error
    console.error("Caught error:", err);
}
