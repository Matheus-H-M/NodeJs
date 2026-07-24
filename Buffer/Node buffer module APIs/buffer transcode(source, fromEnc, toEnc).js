// Import Buffer and the transcode() function from the Node.js buffer module.
const { Buffer, transcode } = require("node:buffer");

// The original text that will be stored in a UTF-8 buffer.
const text = "Olá, mundo! €";

// Create a Buffer using UTF-8 encoding.
const bufferUtf8 = Buffer.from(text, "utf8");

// Print the original text stored in the UTF-8 buffer.
console.log("Original text:");
console.log(bufferUtf8.toString("utf8"));

// Convert the UTF-8 buffer to an ASCII buffer.
// Characters that cannot be represented in ASCII (such as "á" and "€")
// are replaced with the '?' substitution character.
const bufferAscii = transcode(bufferUtf8, "utf8", "ascii");

// Print the transcoded ASCII text.
console.log("\nAfter transcoding to ASCII:");
console.log(bufferAscii.toString("ascii"));

// Display the raw bytes stored in the ASCII buffer.
console.log("\nASCII bytes:");
console.log(bufferAscii);

// Convert the ASCII buffer back to UTF-8.
const bufferUtf8Again = transcode(bufferAscii, "ascii", "utf8");

// Print the UTF-8 text after converting it back from ASCII.
// The original unsupported characters are permanently lost and remain as '?'.
console.log("\nConverted back to UTF-8:");
console.log(bufferUtf8Again.toString("utf8"));