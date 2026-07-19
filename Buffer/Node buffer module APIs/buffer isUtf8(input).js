import { isUtf8 } from 'node:buffer';

// Create a Buffer containing valid UTF-8 encoded text.
const bufferValido = Buffer.from("Olá, mundo!", "utf8");

// Check whether the buffer contains only valid UTF-8 data.
// Expected output: true
console.log(isUtf8(bufferValido));

// Create a Buffer with bytes that do not form a valid UTF-8 sequence.
const bufferInvalido = Buffer.from([0xff, 0xfe, 0xfd]);

// Check whether the buffer contains only valid UTF-8 data.
// Expected output: false
console.log(isUtf8(bufferInvalido));