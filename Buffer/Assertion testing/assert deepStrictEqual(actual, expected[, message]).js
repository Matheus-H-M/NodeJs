// Import the strict version of Node.js assert module
const assert = require('node:assert/strict');

// This fails because 1 (number) is NOT strictly equal to '1' (string).
// deepStrictEqual uses Object.is() for primitive comparison.
assert.deepStrictEqual({ a: 1 }, { a: '1' });
// AssertionError


// Create a real Date object
const date = new Date();

// Create a plain empty object
const object = {};

// Create another empty object
const fakeDate = {};

// Manually set fakeDate's prototype to Date.prototype
// This makes it "look like" a Date in terms of prototype chain
Object.setPrototypeOf(fakeDate, Date.prototype);

// ❌ Fails because the prototypes are different:
// object has Object.prototype
// fakeDate has Date.prototype
assert.deepStrictEqual(object, fakeDate);
// AssertionError


// ❌ Fails because type tags are different:
// date is a real Date object
// fakeDate is just a plain object with Date prototype
assert.deepStrictEqual(date, fakeDate);
// AssertionError


// ✅ Passes because Object.is(NaN, NaN) returns true
// Unlike ===, Object.is correctly treats NaN as equal to NaN
assert.deepStrictEqual(NaN, NaN);


// ❌ Fails because wrapped numbers are different values
// new Number(1) !== new Number(2)
assert.deepStrictEqual(new Number(1), new Number(2));
// AssertionError


// ✅ Passes because both unwrap to the same primitive value "foo"
// deepStrictEqual compares both wrapper object and primitive value
assert.deepStrictEqual(new String('foo'), Object('foo'));


// ✅ Passes because -0 is strictly equal to -0
assert.deepStrictEqual(-0, -0);


// ❌ Fails because 0 and -0 are NOT the same with Object.is()
// Object.is(0, -0) returns false
assert.deepStrictEqual(0, -0);
// AssertionError


// Create two different Symbols
const symbol1 = Symbol();
const symbol2 = Symbol();

// ✅ Passes because the SAME symbol reference is used in both objects
assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol1]: 1 });


// ❌ Fails because symbol1 and symbol2 are different symbols
// Even though they look identical, Symbols are unique
assert.deepStrictEqual({ [symbol1]: 1 }, { [symbol2]: 1 });
// AssertionError


// Create two different WeakMap instances
const weakMap1 = new WeakMap();
const weakMap2 = new WeakMap();
const obj = {};

// Add the same key/value pair to both WeakMaps
weakMap1.set(obj, 'value');
weakMap2.set(obj, 'value');

// ❌ Fails because WeakMaps are NOT compared structurally
// They are only equal if they reference the exact same instance
assert.deepStrictEqual(weakMap1, weakMap2);
// AssertionError


// ✅ Passes because it compares the same WeakMap instance
assert.deepStrictEqual(weakMap1, weakMap1);


// Create two different WeakSet instances
const weakSet1 = new WeakSet();
const weakSet2 = new WeakSet();

// Add the same object to both
weakSet1.add(obj);
weakSet2.add(obj);

// ❌ Fails because WeakSets are only equal by reference,
// not by their contents
assert.deepStrictEqual(weakSet1, weakSet2);
// AssertionError


// ✅ Passes because it compares the same WeakSet instance
assert.deepStrictEqual(weakSet1, weakSet1);
