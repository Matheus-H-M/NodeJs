// Import Node.js's built-in "path" module
const path = require('path');

// Import "node-gyp-build" to load the native addon
const loadBinding = require('node-gyp-build');

// Load the prebuilt native binary from the current directory
const addon = loadBinding(path.join(__dirname));

// Export an object containing the addon functions
module.exports = {

    // Define the "hello" function with a default name
    hello(name = 'mundo') {

        // Call the native "hello" function and return its result
        return addon.hello(name);
    }

};