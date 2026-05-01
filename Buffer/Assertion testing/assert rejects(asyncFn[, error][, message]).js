// Import the strict version of Node.js assert module
const assert = require('node:assert/strict');

// Asynchronous function that performs division
async function dividir(a, b) {

    // If the divisor is zero, throw a TypeError
    if (b === 0) {
        throw new TypeError('Division by zero');
    }

    // Otherwise, return the division result
    return a / b;
}

// Immediately Invoked Async Function Expression (Async IIFE)
(async () => {

    // assert.rejects verifies that the async function rejects (throws an error)
    await assert.rejects(

        // Function that is expected to throw an error
        async () => {
            await dividir(10, 0);
        },

        // Expected error validation object
        {
            name: 'TypeError',
            message: 'Division by zero',
        },

        // Custom message shown if the assertion fails
        'The function should throw TypeError when dividing by zero'
    );

    // If execution reaches here, the test passed
    console.log("☑️ Test passed: error was correctly rejected.");

})();