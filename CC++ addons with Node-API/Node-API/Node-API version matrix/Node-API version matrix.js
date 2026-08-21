// Include the Node-API header.
// This provides the types, functions, and macros needed
// to create a native Node.js addon.
#include <node_api.h>

// This function will be exposed to JavaScript as "hello".
//
// napi_env:
//   Represents the current Node-API environment.
//
// napi_callback_info:
//   Contains information about the JavaScript function call,
//   such as arguments and the "this" value.
napi_value Hello(napi_env env, napi_callback_info info) {
    // This will store the JavaScript string that we create.
    napi_value result;

    // Create a JavaScript string using UTF-8 encoding.
    //
    // env:
    //   The current Node-API environment.
    //
    // "Olá! Addon usando Node-API.":
    //   The text that will be returned to JavaScript.
    //
    // NAPI_AUTO_LENGTH:
    //   Tells Node-API to automatically calculate the string length.
    //
    // &result:
    //   The address where the resulting JavaScript string will be stored.
    napi_status status = napi_create_string_utf8(
        env,
        "Olá! Addon usando Node-API.",
        NAPI_AUTO_LENGTH,
        &result
    );

    // Check whether the operation was successful.
    //
    // napi_ok means that the Node-API operation completed successfully.
    if (status != napi_ok) {
        // Return NULL if the string could not be created.
        return NULL;
    }

    // Return the JavaScript string to the caller.
    return result;
}

// Initialize the Node.js addon.
//
// NAPI_MODULE_INIT provides the "env" and "exports" variables
// that are needed to register functions in the addon.
NAPI_MODULE_INIT() {

    // This will store the JavaScript function we are going to create.
    napi_value hello_function;

    // Create a JavaScript function named "hello".
    //
    // The C function "Hello" will be called whenever
    // JavaScript calls addon.hello().
    napi_create_function(
        env,
        "hello",
        NAPI_AUTO_LENGTH,
        Hello,
        NULL,
        &hello_function
    );

    // Add the "hello" function to the module's exports object.
    //
    // After this, JavaScript can access the function as:
    //
    // const addon = require("./addon");
    // addon.hello();
    napi_set_named_property(
        env,
        exports,
        "hello",
        hello_function
    );

    // Return the exports object.
    return exports;
}