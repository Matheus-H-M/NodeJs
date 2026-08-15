// Load the compiled native addon from the build directory.
const addon = require('./build/Release/addon');

// Call the "somar" function from the native addon
// with the values 10 and 20, then print the result.
console.log(addon.somar(10, 20)); // 30