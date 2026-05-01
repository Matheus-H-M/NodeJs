// Import the built-in Node.js assert module
const assert = require("node:assert");

// Log a message indicating we are testing assert(value)
console.log("Testing assert(value)");

// assert(value) checks if the value is truthy
// These will NOT throw errors because they are truthy values
assert(true);
assert(1);
assert("hello");

// Log a message indicating we are testing assert.deepEqual()
console.log("Testing assert.deepEqual()");

// Create first object
const obj1 = {
    a: {
        b: 1,
    },
};

// Create second object (same structure and values as obj1)
const obj2 = {
    a: {
        b: 1,
    },
};

// Create third object (different nested value)
const obj3 = {
    a: {
        b: 2,
    },
};

// deepEqual compares objects recursively
// This passes because obj1 and obj2 have identical structure and values
assert.deepEqual(obj1, obj2);

// Use try/catch to handle assertion error
try {
    // This will throw an AssertionError because values differ (b: 1 !== 2)
    assert.deepEqual(obj1, obj3);
} catch (error) {
    console.log("Error detected (different values):");
    console.log(error.message);
}

// WARNING: deepEqual uses == for primitive comparison
// This will NOT throw an error because "+000000000" == false is true
assert.deepEqual("+000000000", false);

console.log('"+000000000" is considered equal to false with deepEqual');

// Example of assert with a custom error message
try {
    // This will throw because false is not truthy
    assert(false, "Value must be true!");
} catch (error) {
    console.log("Custom error:");
    console.log(error.message);
}

// Final message indicating the end of tests
console.log("End of tests");
