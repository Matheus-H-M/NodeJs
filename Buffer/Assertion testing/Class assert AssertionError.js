// Import the built-in Node.js assertion module
const assert = require('node:assert');

// Function that validates if an age is valid
function validarIdade(idade) {
    // Check if the age is less than 18
    if (idade < 18) {
        // Throw a custom AssertionError when the condition fails
        throw new assert.AssertionError({
            // Custom error message
            message: "invalid age: must be greater than or equal to 18",

            // The actual value received
            actual: idade,

            // The expected value
            expected: 18,

            // The comparison operator used
            operator: ">=",

            // Removes stack trace lines above this function
            stackStartFn: validarIdade,

            // Intended to control diff output (typo here: should be `diff`)
            fidd: "full",
        });
    }
}

// Try to execute the validation
try {
    // This will fail because 16 is less than 18
    validarIdade(16);
} catch (err) {
    // Check if the error is an AssertionError
    if (err instanceof assert.AssertionError) {
        // Log that an assertion error was caught
        console.log("Assertion error caught!");

        // Error name (AssertionError)
        console.log("name:", err.name);

        // Error message
        console.log("message:", err.message);

        // Actual value that caused the failure
        console.log("actual:", err.actual);

        // Expected value
        console.log("expected:", err.expected);

        // Operator used in the assertion
        console.log("operator:", err.operator);

        // Error code (always ERR_ASSERTION)
        console.log("code:", err.code);

        // Indicates whether the message was auto-generated
        // (variable name typo below: printed label differs from property name)
        console.log("generatedMenssage:", err.generatedMessage);

        // Full stack trace of the error
        console.log("\nStack trace:\n", err.stack);
    } else {
        // Re-throw the error if it's not an AssertionError
        throw err;
    }
}
