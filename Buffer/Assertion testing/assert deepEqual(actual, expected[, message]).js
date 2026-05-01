// Import Node.js built-in assertion module
const assert = require('node:assert');

// ---------------------------------------------
// Example 1 - Deep comparison of objects
// ---------------------------------------------

console.log('Example 1 - Deep object comparison:');

// First user object
const user1 = {
  id: 1,
  profile: {
    name: "carlos",
    age: 30,
  },
};

// Second user object (intentionally different values)
const user2 = {
  id: 1,
  profile: {
    name: "cARLOS", // different casing
    age: 30,
  },
};

// This will throw an AssertionError because
// deepEqual compares property values recursively
// and "carlos" != "cARLOS"
try {
  assert.deepEqual(user1, user2);
  console.log("user1 is deepEqual to user2");
} catch (err) {
  console.log("Assertion failed:", err.message);
}

// ---------------------------------------------
// Example 2 - Difference in nested property
// ---------------------------------------------

console.log('\nExample 2 - Difference in nested property:');

// Third user object with different age
const user3 = {
  id: 1,
  profile: {
    name: "Carlos",
    age: 31, // different value
  },
};

// Try comparing user1 and user3
try {
  assert.deepEqual(user1, user3, "Users should be equal");
} catch (err) {
  // If not equal, the error is caught here
  console.log("Error caught:", err.message);
}

// ---------------------------------------------
// Example 3 - Comparison using == (surprising behavior)
// ---------------------------------------------

console.log('\nExample 3 - Comparison using == (surprising behavior):');

// deepEqual uses == for primitive comparison (legacy behavior)
// '+00000000' == false evaluates to true
assert.deepEqual('+00000000', false);

console.log('✔ "+00000000" and false are considered equal with deepEqual');

// ---------------------------------------------
// Example 4 - Prototype is NOT compared
// ---------------------------------------------

console.log('\nExample 4 - Prototype is NOT compared:');

// Create an object that uses user1 as its prototype
const objWithProto = { __proto__: user1 };

// deepEqual only checks enumerable "own" properties,
// not the prototype chain
try {
  assert.deepEqual(user1, objWithProto);
} catch (err) {
  console.log('Prototypes are ignored:', err.message);
}

// ---------------------------------------------
// Example 5 - Custom Error as message
// ---------------------------------------------

console.log('\nExample 5 - Custom Error as message:');

try {
  assert.deepEqual(
    { a: 1 },
    { a: 2 },
    // If assertion fails, this custom Error will be thrown
    new Error('Objects are not equivalent!')
  );
} catch (err) {
  console.log('Custom Error thrown:', err.message);
}

console.log('\nEnd of tests.');
