'use strict';

// Create an array containing numeric indexes and string keys
const keys = [0, 1, 2, "name", "age"];

// Function to keep numeric indexes unchanged
function keepNumbers(keys) {
    return keys.map(key => {
        return typeof key === "number" ? key : key;
    });
}

// Function to convert all keys into strings
function convertToStrings(keys) {
    return keys.map(key => String(key));
}

// Execute both functions
const result1 = keepNumbers(keys);
const result2 = convertToStrings(keys);

// Display the original and converted keys
console.log("Original indexes:", keys);
console.log("Keeping numbers:", result1);
console.log("Converting to strings:", result2);

// Check the data types of the first indexes
console.log("Original first index type:", typeof result1[0]);
console.log("Converted first index type:", typeof result2[0]);