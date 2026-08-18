// Import Node.js's built-in "path" module.
// This module helps us safely create file and directory paths.
const path = require("path");

// Variable that will store the native addon.
let addon;

try {
    // Try to load the prebuilt native binary.
    // If a compatible prebuilt binary is available,
    // it will be loaded here.
    addon = require("prebuild-install");
} catch {
    // If the prebuilt binary cannot be loaded,
    // fall back to the locally compiled native addon.
    //
    // The native addon is expected to be located at:
    // build/Release/meu_modulo.node
    addon = require(
        path.join(__dirname, "build/Release/meu_modulo.node")
    );
}

// Display a message indicating that the native module was loaded.
console.log("Native module loaded!");

// Export the native addon so other JavaScript files
// can use it with require().
module.exports = addon;