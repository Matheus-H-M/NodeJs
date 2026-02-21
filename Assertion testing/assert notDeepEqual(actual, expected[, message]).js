// Import the built-in Node.js assert module
const assert = require('node:assert');

// First test object
const obj1 = {
    a: {
        b: 1,
    },
};

// Second test object (different value inside property b)
const obj2 = {
    a: {
        b: 2,
    },
};

// Third test object (same structure and values as obj1)
const obj3 = {
    a: {
        b: 1,
    },
};

try {

    // This will throw an error because obj1 is deeply equal to itself
    assert.notDeepEqual(obj1, obj1);

} catch (error) {

    // Catch and display the assertion error message
    console.log('Error 1:', error.message);
}

try {

    // This will PASS because obj1 and obj2 are deeply different
    assert.notDeepEqual(obj1, obj2);

    // If no error is thrown, this message will be printed
    console.log('Test 2 passed (obj1 is different from obj2)');

} catch (error) {

    // If an error occurs, display it
    console.log('Error 2:', error.message);
}

try {

    // This will throw an AssertionError because obj1 and obj3 are deeply equal
    // The custom string message will be used in the error
    assert.notDeepEqual(obj1, obj3, "Objects should not be equal");

} catch (error) {

    // Display the custom error message
    console.log('Error 3:', error.message);
}

try {

    // This will throw the custom Error object instead of AssertionError
    assert.notDeepEqual(obj1, obj3, new Error('Custom error message!'));

} catch (error) {

    // Display the custom error message
    console.log('Error 4:', error.message);
}