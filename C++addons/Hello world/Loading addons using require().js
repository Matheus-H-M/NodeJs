// Load the native addon from the compiled binary.
// The ".node" extension is omitted because Node.js resolves it automatically.
const addon = require('./build/release/addon');

// Call the "hello" function exported by the native addon
// and print its return value to the console.
console.log(addon.hello());

// Check whether the addon exports a function named "sum".
if (typeof addon.sum === 'function') {
    // Call the "sum" function with the values 10 and 20
    // and display the result.
    console.log('10 + 20 =', addon.sum(10, 20));
}