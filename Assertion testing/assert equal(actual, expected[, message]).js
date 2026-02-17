// Import the built-in Node.js assertion module
const assert = require('node:assert');

// Print a section header for passing examples
console.log("=== Examples that PASSED ===");

// assert.equal uses loose equality (==), not strict equality (===)
// So number 1 and string "1" are considered equal due to type coercion
assert.equal(1, "1");
console.log("1 == '1' passed");

// NaN is a special case: normally NaN !== NaN
// But assert.equal treats NaN as equal to NaN
assert.equal(NaN, NaN);
console.log("NaN, NaN passed");

// Print a section header for a failing example with custom message
console.log("\n=== Example that FAILS with custom message ===");

try {
    // This will fail because 10 != 20
    // The third parameter is a custom error message
    assert.equal(10, 20, "The values should be equal!");
} catch (err) {
    // Catch the AssertionError so the program doesn't crash
    console.log("Error caught:");
    console.log(err.message);
}

// Print a section header for object comparison
console.log("\n=== Object comparison (fails - shallow comparison) ===");

try {
    // This will fail because assert.equal compares object references,
    // not their internal structure.
    // Even though both objects look identical,
    // they are different objects in memory.
    assert.equal({ a: 1 }, { a: 1 });
} catch (err) {
    // Catch and display the error message
    console.log("Error caught:");
    console.log(err.message);
}
