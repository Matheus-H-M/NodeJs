// Defines a function named "add" that accepts any number of arguments.
// The rest parameter (...) stores all arguments in the "args" array.
function add(...args) {

    // Check if at least two arguments were provided.
    // If not, throw a TypeError.
    if (args.length < 2) {
        throw new TypeError("Wrong number of arguments");
    }

    // Verify that the first two arguments are numbers.
    // If either argument is not a number, throw a TypeError.
    if (typeof args[0] !== "number" || typeof args[1] !== "number") {
        throw new TypeError("Wrong arguments");
    }

    // Return the sum of the first two arguments.
    return args[0] + args[1];
}

// Export the "add" function so it can be imported by other files.
// Note: The correct property is "module.exports", not "module.exprots".
module.exports = {
    add
};

// Import the exported module from the "math.js" file.
const addon = require("./math");

// Call the add() function with two valid numbers.
// Expected output: "This should be eight: 8"
console.log("This should be eight:", addon.add(3, 5));

// Attempt to call add() with only one argument.
// This will throw a TypeError, which is caught by the catch block.
try {
    addon.add(3);
} catch (err) {
    // Print the error message.
    console.log(err.message);
}