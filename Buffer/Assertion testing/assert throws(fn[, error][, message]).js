// Import the strict version of Node.js assert module
const assert = require('node:assert/strict');

// Function that performs division
function dividir(a, b){
    // If the divisor is zero, throw a TypeError
    if(b === 0){
        throw new TypeError('Division by zero is not allowed');
    }

    // Otherwise, return the division result
    return a / b;
}

// Test 1: Expect the function to throw a TypeError
assert.throws(
    () => {
        dividir(10, 0); // This should throw
    },
    {
        // Validate error properties
        name: "TypeError",
        message: "Division by zero is not allowed",
    },
    // Custom message if assertion fails
    'The function should throw TypeError when dividing by zero'
);

console.log('Test 1 passed');

// Test 2: Validate only the error type (instanceof TypeError)
assert.throws(
    () => {
        dividir(5, 0); // Should throw
    },
    TypeError
);

console.log('Test 2 passed');

// Test 3: Validate using a RegExp to check the error message
assert.throws(
    () => {
        dividir(8, 0); // Should throw
    },
    /zero/ // Checks if the error message contains "zero"
);

console.log('Test 3 passed');

// Test 4: Custom validation function
assert.throws(
    () => {
        dividir(3, 0); // Should throw
    },
    (err) => {
        // Check if error is instance of TypeError
        assert(err instanceof TypeError);

        // Check if message contains the word "zero"
        assert(err.message.includes('zero'));

        // Must return true if validation passes
        return true;
    }
);

console.log('Test 4 passed');