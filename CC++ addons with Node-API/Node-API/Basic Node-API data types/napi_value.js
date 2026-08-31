#include <node_api.h>

// This function is called from JavaScript.
// It creates and returns a JavaScript string value.
napi_value hello(napi_env env, napi_callback_info info) {

    // napi_value is an opaque pointer used by N-API
    // to represent a JavaScript value.
    napi_value result;

    // Create a JavaScript string from a UTF-8 C string.
    //
    // env:
    //   The N-API environment associated with the current JavaScript context.
    //
    // "Hello, JavaScript!":
    //   The UTF-8 string that will become a JavaScript string.
    //
    // NAPI_AUTO_LENGTH:
    //   Tells N-API to automatically determine the string length.
    //
    // &result:
    //   N-API stores the newly created JavaScript value in 'result'.
    napi_create_string_utf8(
        env,
        "Hello, JavaScript!",
        NAPI_AUTO_LENGTH,
        &result
    );

    // Return the JavaScript value to the JavaScript caller.
    return result;
}

// This function initializes the native addon.
// Node.js calls this function when the addon is loaded.
napi_value Init(napi_env env, napi_value exports) {

    // This napi_value will represent the JavaScript function
    // that we are going to create.
    napi_value fn;

    // Create a JavaScript function that calls the native
    // C/C++ function 'hello'.
    napi_create_function(
        env,
        "hello",            // Name of the JavaScript function.
        NAPI_AUTO_LENGTH,   // Automatically determine the name length.
        hello,              // Native callback function.
        nullptr,            // Optional user data; not needed here.
        &fn                 // Store the created JavaScript function in 'fn'.
    );

    // Add the function to the exported object.
    //
    // This allows JavaScript code to call:
    //
    //     addon.hello()
    //
    napi_set_named_property(
        env,
        exports,
        "hello",
        fn
    );

    // Return the exports object.
    return exports;
}

// Register the Init function as the entry point of the Node.js addon.
//
// NODE_GYP_MODULE_NAME is replaced by the module name during compilation.
// When Node.js loads the native addon, it calls Init().
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)


The important napi_value part is:

napi_value result;


Here, result is an N-API handle representing a JavaScript value. After:

napi_create_string_utf8(
    env,
    "Hello, JavaScript!",
    NAPI_AUTO_LENGTH,
    &result
);


result represents the JavaScript string:

"Hello, JavaScript!"


So the basic flow is:

C/C++ value
     ↓
N-API function
     ↓
napi_value
     ↓
JavaScript value