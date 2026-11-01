// Define an object with three properties
const object = {
    name: "Carlos",
    age: 25,
    city: "Brazil"
};

// Get all enumerable own string-keyed properties
const enumerable = Object.keys(object);

// Print enumerable properties
console.log("Enumerable properties:");
console.log(enumerable);

// Get all own string-keyed properties, including non-enumerable ones
const allProperties = Object.getOwnPropertyNames(object);

// Print all properties
console.log("All properties:");
console.log(allProperties);

// Get property descriptors and filter writable properties
const writable = Object.entries(
    Object.getOwnPropertyDescriptors(object)
)
    // Keep only properties that can be modified
    .filter(([key, descriptor]) => descriptor.writable)
    // Extract the property names
    .map(([key]) => key);

// Print writable properties
console.log("Writable properties:");
console.log(writable);
