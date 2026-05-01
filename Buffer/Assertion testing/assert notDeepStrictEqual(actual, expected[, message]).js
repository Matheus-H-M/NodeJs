// Import the built-in Node.js assert module in strict mode
const assert = require('node:assert/strict');

// Create two objects with similar structure but different value types
const obj1 = { a: 1 };      // Property "a" is a number
const obj2 = { a: '1' };    // Property "a" is a string

// This assertion checks that the two objects are NOT deeply and strictly equal
// Since 1 (number) is different from '1' (string), the test passes
assert.notDeepStrictEqual(obj1, obj2);

// Log success message to the console
console.log('Test 1 passed: the objects are different');

// Create two arrays with different last elements
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 4];

// This assertion verifies that the arrays are NOT deeply and strictly equal
// Because 3 is different from 4, the test passes
assert.notDeepStrictEqual(arr1, arr2);

// Log success message to the console
console.log('Test 2 passed: the arrays are different.');

try {
    // This assertion will FAIL because both objects are deeply and strictly equal
    // When they are equal, assert.notDeepStrictEqual throws an AssertionError
    assert.notDeepStrictEqual({ b: 2 }, { b: 2 }, 'Objects should not be equal');
} catch (err) {
    // The error is caught here and its message is printed
    console.error('Error caught:', err.message);
}