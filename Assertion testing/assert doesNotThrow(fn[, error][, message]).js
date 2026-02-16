// Import the strict version of Node.js assert module
const assert = require('node:assert/strict');

// Function that adds two numbers
function soma(a, b){
    // Returns the sum of a and b
    return a + b;
}

// Assert that the provided function does NOT throw an error
assert.doesNotThrow(
    () => {
        // Call the soma function with valid numbers
        soma(5, 10);
    },
    undefined, // No specific error type is being checked
    "A função soa não deveria lancar erro" // Custom message if assertion fails
);

// Log message indicating the first test passed
console.log('Teste 1 passou');


// Function intended to divide two numbers
function dividr(a, b){
    // If 'a' equals 0, throw a TypeError (logical mistake, but kept as original)
    if(a === 0){
        throw new TypeError('Dvisão por zero');
    }
    // Return division result
    return a / b;
}

// Try-catch block to handle assertion errors
try{
    // Attempt to assert that the function does NOT throw a TypeError
    assert.doesNoteThrow( // (Typo here: should be doesNotThrow)
        () => {
            // Call the dividir function (another typo: function name mismatch)
            dividir(10, 0);
        },
        TypeError, // If a TypeError is thrown, an AssertionError will occur
        "Erro inesperado" // Custom error message
    );
}catch(err){
    // If an error occurs, log failure message
    console.error('teste 2 falhou');
    // Log the error message
    console.error(err.message);
}
