// Import the node-pre-gyp package.
// node-pre-gyp helps locate and load precompiled native binaries.
const binary = require('node-pre-gyp');

// Get the absolute path to the package.json file.
// This file contains the configuration for the native binary.
const packagePath = require.resolve('./package.json');

// Find the path of the appropriate native binary
// for the current Node.js version, operating system, and CPU architecture.
const binaryPath = binary.find(packagePath);

// Print the path where the native binary was found.
console.log('Binary found at:', binaryPath);

// Load and export the native binary as the module's main functionality.
module.exports = require(binaryPath);