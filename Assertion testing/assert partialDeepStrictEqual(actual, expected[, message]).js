// Import the built-in Node.js assertion module
const assert = require('node:assert');

// ----------------------------------------------------
// Test 1: Deep nested object comparison
// This checks deep equality recursively.
// Since both objects are identical, it passes.
assert.partialDeepStrictEqual(
    { a: { b: { c: 1 } } },
    { a: { b: { c: 1 } } }
);
console.log("Test 1 passed");

// ----------------------------------------------------
// Test 2: Partial object comparison
// Only properties present in the expected object ({ b: 2 })
// are compared. Extra properties in the actual object are ignored.
assert.partialDeepStrictEqual(
    { a: 1, b: 2, c: 3 },
    { b: 2 }
);
console.log("Test 2 passed");

// ----------------------------------------------------
// Test 3: Array partial comparison (order matters)
// The expected array [4, 5, 8] must match in the same order
// inside the actual array.
assert.partialDeepStrictEqual(
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [4, 5, 8]
);
console.log("Test 3 passed");

// ----------------------------------------------------
// Test 4: Array comparison with different order
// This fails because array element order matters.
try {
    assert.partialDeepStrictEqual(
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [5, 4, 8]
    );
} catch (err) {
    // Catch and display the assertion error message
    console.log("Test 4 failed:", err.message);
}

// ----------------------------------------------------
// Test 5: Map comparison (order does NOT matter)
// Maps are compared unordered.
// Only the expected entry ["key2", "value2"] must exist.
assert.partialDeepStrictEqual(
    new Map([
        ["key1", "value1"],
        ["key2", "value2"]
    ]),
    new Map([
        ["key2", "value2"]
    ])
);
console.log("Test 5 passed");

// ----------------------------------------------------
// Test 6: BigInt comparison
// Primitive values are compared using Object.is().
// Since both are 123n, it passes.
assert.partialDeepStrictEqual(123n, 123n);
console.log("Test 6 passed");

// ----------------------------------------------------
// Test 7: Type mismatch inside nested object
// This fails because number 2 is not strictly equal to string "2".
try {
    assert.partialDeepStrictEqual(
        { a: { b: 2 } },
        { a: { b: "2" } }
    );
} catch (err) {
    // Catch and display the assertion error message
    console.log("Test 7 failed:", err.message);
}