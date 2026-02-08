// Import the Node.js built-in assertion module
// Using 'node:assert' enables legacy assertion mode
const assert = require('node:assert');

// In legacy mode, assert.equal uses the == operator
// This assertion passes because 1 == '1' is true
assert.equal(1, '1');

// ⚠️ In legacy assertion mode, assert.deepEqual also uses loose equality
// Even though a RegExp and a Date are completely different objects,
// this assertion DOES NOT throw an error
assert.deepEqual(/a/gi, new Date());

// If no assertion failed, this line will be executed
console.log('All assertions passed (legacy mode)');
