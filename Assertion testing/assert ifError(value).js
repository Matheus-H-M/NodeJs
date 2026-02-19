// Import the strict version of Node.js assert module
const assert = require('node:assert/strict');

try {
    // This will NOT throw because the value is null
    // assert.ifError only throws if the value is NOT null or undefined
    assert.ifError(null);
    console.log("No error (null value)");
} catch (err) {
    // This block would execute only if an unexpected error occurs
    console.error("Unexpected error:", err.message);
}

try {
    // This WILL throw because 0 is not null or undefined
    // assert.ifError treats any non-null/undefined value as an error
    assert.ifError(0);
} catch (err) {
    // The thrown AssertionError is caught here
    console.error("Caught error:", err.message);
}

// Function that simulates an operation using a callback
function minhaFuncao(callback) {

    // Simulating an error
    const erro = new Error("Something went wrong!");

    // Passing the error to the callback (Node.js error-first pattern)
    callback(erro);
}

// Calling the function and handling the callback
minhaFuncao((err) => {
    try {
        // This will throw because err contains an Error object
        assert.ifError(err);
        console.log("Executed without errors");
    } catch (e) {
        // The AssertionError triggered by ifError is handled here
        console.error("Error detected by assert.ifError:", e.message);
    }
});
