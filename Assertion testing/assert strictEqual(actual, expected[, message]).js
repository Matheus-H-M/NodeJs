// Import the strict version of Node.js assert module
const assert = require('node:assert/strict');

// ---------------------------
// Example 1: Values are equal
// ---------------------------
try {
    // This will PASS because 10 is strictly equal to 10
    assert.strictEqual(10, 10);

    // If no error is thrown, this message will be displayed
    console.log("Example 1: OK - Values are strictly equal.");
} catch (err) {
    // If an error occurs, it will be caught and displayed here
    console.error("Example 1:", err.message);
}


// ------------------------------------
// Example 2: Different number values
// ------------------------------------
try {
    // This will FAIL because 10 is not strictly equal to 20
    assert.strictEqual(10, 20);
} catch (err) {
    // The AssertionError message will be displayed
    console.error("Example 2:", err.message);
}


// ------------------------------------
// Example 3: Different types (number vs string)
// ------------------------------------
try {
    // This will FAIL because 10 (number) is not strictly equal to "10" (string)
    // strictEqual uses Object.is() internally, so types must also match
    assert.strictEqual(10, "10");
} catch (err) {
    console.error("Example 3:", err.message);
}


// ------------------------------------
// Example 4: Custom error message (string)
// ------------------------------------
try {
    // Current age value
    const currentAge = 18;

    // Expected age value
    const expectedAge = 21;

    // This will FAIL because 18 !== 21
    // The custom message will replace the default AssertionError message
    assert.strictEqual(
        currentAge,
        expectedAge,
        `Age ${currentAge} does not match expected ${expectedAge}`
    );
} catch (err) {
    console.error("Example 4:", err.message);
}


// ------------------------------------
// Example 5: Passing an Error object
// ------------------------------------
try {
    // If the assertion fails and an Error object is provided,
    // that specific Error will be thrown instead of AssertionError
    assert.strictEqual(1, "1", new TypeError("Values are not identical"));
} catch (err) {
    // Here we log the entire error object (not just the message)
    console.error("Example 5:", err);
}