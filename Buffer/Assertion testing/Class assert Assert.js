// Import the Assert class from Node.js built-in assert module
const { Assert } = require('node:assert');

// Create a custom Assert instance with specific options
const assertCustom = new Assert({
    diff: 'full',        // Show full diff output when an assertion fails
    strict: true,        // Force non-strict methods to behave as strict ones
    skipPrototype: true  // Ignore prototype/constructor differences in deep equality checks
});

// First class definition
class UsuarioA {
    constructor(nome) {
        // Assign the name property
        this.nome = nome;
    }
}

// Second class definition (different constructor, same structure)
class UsuarioB {
    constructor(nome) {
        // Assign the name property
        this.nome = nome;
    }
}

// Create instances of different classes with the same data
const user1 = new UsuarioA("Ana");
const user2 = new UsuarioB("Ana");

// Deeply compare both objects
// This passes because skipPrototype is true and properties are equal
assertCustom.deepStrictEqual(user1, user2);

// Log success message if no assertion error is thrown
console.log("Objects are considered equal!");
