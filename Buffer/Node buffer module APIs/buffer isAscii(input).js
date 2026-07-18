// Create a Buffer containing only ASCII characters.
const asciiBuffer = buffer.from("Hello, World", "ascii");

// Create a Buffer containing UTF-8 text with a non-ASCII character ("á").
const utf8Buffer = buffer.from("Olá, mundo!", "utf8");

// Check whether the first Buffer contains only valid ASCII data.
console.log(buffer.isAscii(asciiBuffer)); // true

// Check whether the second Buffer contains only valid ASCII data.
console.log(buffer.isAscii(utf8Buffer)); // false

// Create an empty Buffer.
const emptyBuffer = buffer.alloc(0);

// An empty Buffer is considered valid ASCII.
console.log(buffer.isAscii(emptyBuffer)); // true