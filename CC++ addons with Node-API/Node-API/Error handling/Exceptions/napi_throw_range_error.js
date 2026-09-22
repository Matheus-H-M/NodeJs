// Load the native Node.js addon compiled as a .node file.
const addon = require('./build/Release/addon');

// Start a try block to handle any error thrown by the native addon.
try {
    // Call the test() function exported by the native addon.
    // This function is expected to throw a JavaScript RangeError.
    addon.test();
} catch (err) {
    // Print the name of the error, such as "RangeError".
    console.log(err.name);

    // Print the error message provided by napi_throw_range_error().
    console.log(err.message);

    // Print the optional error code provided by napi_throw_range_error().
    console.log(err.code);
}
