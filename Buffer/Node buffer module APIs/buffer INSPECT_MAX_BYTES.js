// Import the Node.js 'buffer' module
const buffer = require('buffer');

// Import the 'util' module to use the inspect() function
const util = require('util');

// Display the default maximum number of bytes shown
// when a Buffer is inspected
console.log('Default value:', buffer.INSPECT_MAX_BYTES);

// Change the inspection limit to 10 bytes
buffer.INSPECT_MAX_BYTES = 10;

// Create a Buffer with 30 bytes, each filled with 0x41 ('A')
const buf = Buffer.alloc(30, 0x41);

// Display the Buffer using util.inspect()
// Only the first 10 bytes will be shown because
// INSPECT_MAX_BYTES was changed to 10
console.log(util.inspect(buf));