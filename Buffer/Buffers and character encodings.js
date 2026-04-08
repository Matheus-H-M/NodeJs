// Import the Buffer class from Node.js
const { Buffer } = require('node:buffer');

// Original text string (contains a special character "á")
const texto = 'Olá Mundo';

// === ENCODING (string -> buffer) ===

// Create buffers using different character encodings
const bufUtf8 = Buffer.from(texto, 'utf8');      // UTF-8 encoding (default, most common)
const bufUtf16 = Buffer.from(texto, 'utf16le');  // UTF-16 Little Endian encoding
const bufLatin1 = Buffer.from(texto, 'latin1');  // Latin-1 encoding (limited character set)

// Print raw buffer data
console.log('Buffer UTF-8:', bufUtf8);
console.log('Buffer UTF-16LE:', bufUtf16);
console.log('Buffer Latin1:', bufLatin1);

// === DECODING (buffer -> string) ===
console.log('\nDecoding:');

// Convert buffers back into strings using their respective encodings
console.log('UTF-8:', bufUtf8.toString('utf8'));
console.log('UTF-16LE:', bufUtf16.toString('utf16le'));
console.log('Latin1:', bufLatin1.toString('latin1'));

// === CONVERSIONS TO OTHER TEXT FORMATS ===
console.log('\nConversions:');

// Convert buffer to hexadecimal representation
console.log('HEX:', bufUtf8.toString('hex'));

// Convert buffer to Base64 string
console.log('Base64:', bufUtf8.toString('base64'));

// === BASE64 DECODING ===

// Convert buffer to Base64
const base64 = bufUtf8.toString('base64');

// Convert Base64 string back into a buffer
const bufFromBase64 = Buffer.from(base64, 'base64');

// Decode back to original string
console.log('\nBase64 -> Text:', bufFromBase64.toString('utf8'));

// === INVALID UTF-8 EXAMPLE ===

// Create a buffer with invalid UTF-8 byte sequence
const bufferInvalido = Buffer.from([0xff, 0xfe, 0xfd]);

console.log('\nInvalid UTF-8 decoding:');

// Invalid bytes will be replaced with the Unicode replacement character (�)
console.log(bufferInvalido.toString('utf8'));

// === INVALID / TRUNCATED HEX EXAMPLES ===
console.log('\nInvalid/truncated hex:');

// Stops reading when encountering a non-hex character ("g")
console.log(Buffer.from('1ag123', 'hex'));

// Ignores last digit if hex string has odd length
console.log(Buffer.from('1a7', 'hex'));