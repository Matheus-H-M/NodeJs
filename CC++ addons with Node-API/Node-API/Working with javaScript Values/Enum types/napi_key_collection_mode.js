// Define the parent object's properties
const prototype = {
    name: "Parent object",
    age: 30
};

// Create a new object that inherits from the prototype
const person = Object.create(prototype);

// Define properties directly on the child object
person.name = "Child object";
person.email = "test@email.com";

// Collect only the object's own enumerable properties
// Equivalent to napi_key_own_only
const ownOnly = Object.keys(person);

console.log("napi_key_own_only:");
console.log(ownOnly);

// Collect all property names, including inherited properties
// Equivalent to napi_key_include_prototypes
function getAllKeys(obj) {
    // Use a Set to avoid duplicate property names
    const keys = new Set();

    // Traverse the entire prototype chain
    while (obj !== null) {
        // Get all own property names of the current object
        Object.getOwnPropertyNames(obj).forEach(key => {
            keys.add(key);
        });

        // Move to the next object in the prototype chain
        obj = Object.getPrototypeOf(obj);
    }

    // Convert the Set into an array and return it
    return [...keys];
}

// Collect the object's own and inherited properties
const includePrototypes = getAllKeys(person);

console.log("\nnapi_key_include_prototypes:");
console.log(includePrototypes);