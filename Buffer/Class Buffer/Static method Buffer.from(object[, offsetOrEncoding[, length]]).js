// Import Buffer from Node.js buffer module
const { Buffer } = require('node:buffer');

// Class that implements valueOf()
class ObjetoComValueOf {
    // Constructor receives a text value
    constructor(texto) {
        this.texto = texto;
    }

    // valueOf returns the internal text
    // Buffer.from() will use this value
    valueOf() {
        return this.texto;
    }
}

// Create an instance with a string
const obj1 = new ObjetoComValueOf('Exemplo com valueOf');

// Create a buffer from the object using UTF-8 encoding
// Internally calls obj1.valueOf()
const buffer1 = Buffer.from(obj1, 'utf8');

// Print raw buffer data
console.log('Buffer 1:', buffer1);

// Convert buffer back to string
console.log('Texto 1:', buffer1.toString());


// Class that implements Symbol.toPrimitive
class ObjectoComToPrimitive {
    // This method is called when object needs to be converted to a primitive
    [Symbol.toPrimitive](hint) {
        // If conversion is requested as string, return this text
        if (hint === 'string') {
            return 'Exemplo com Symbol.toPrimitive';
        }
        // Otherwise return null
        return null;
    }
}

// Create instance of the class
const obj2 = new ObjectoComToPrimitive();

// Create buffer using UTF-8 encoding
// Internally calls obj2[Symbol.toPrimitive]('string')
const buffer2 = Buffer.from(obj2, 'utf8');

// Print raw buffer
console.log('Buffer 2:', buffer2);

// Convert buffer back to string
console.log('Texto 2:', buffer2.toString());


// Class without valueOf or Symbol.toPrimitive
class ObjetoInvalido {}

// Try to convert invalid object to buffer
try {
    const obj3 = new ObjetoInvalido();

    // This will throw a TypeError because object
    // cannot be converted to a valid primitive
    Buffer.from(obj3);

} catch (erro) {
    // Catch and print expected error
    console.log("Erro esperado:", erro.message);
}