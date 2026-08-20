// Restrict the Node-API surface to version 3 and earlier.
#define NAPI_VERSION 3

// Include the Node-API definitions and functions.
#include <node_api.h>

// This function will be exposed to JavaScript as "StorageManager".
napi_value StorageManager(napi_env env, napi_callback_info info) {

    // We expect two arguments from JavaScript.
    size_t argc = 2;

    // Create an array to store the two JavaScript arguments.
    napi_value args[2];

    // Retrieve the arguments passed to the native function.
    //
    // env: The current Node.js environment.
    // info: Information about the current callback.
    // &argc: Number of arguments available/received.
    // args: Array where the arguments will be stored.
    // nullptr: We are not interested in the "this" value.
    // nullptr: We are not interested in the callback data.
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    // Variables that will contain the numeric values
    // received from JavaScript.
    double a, b;

    // Convert the first JavaScript argument to a C++ double.
    napi_get_value_double(env, args[0], &a);

    // Convert the second JavaScript argument to a C++ double.
    napi_get_value_double(env, args[1], &b);

    // This will hold the JavaScript number that we return.
    napi_value resultado;

    // Create a JavaScript number containing the sum of a and b.
    napi_create_double(env, a + b, &resultado);

    // Return the result to JavaScript.
    return resultado;
}

// This function initializes the native Node.js module.
napi_value Init(napi_env env, napi_value exports) {

    // This will hold the JavaScript function that we create.
    napi_value fn;

    // Create a JavaScript function that calls StorageManager().
    napi_create_function(
        env,                 // Current Node.js environment.
        nullptr,             // Function name (not required here).
        0,                   // Length of the function name.
        StorageManager,      // Native C++ function to execute.
        nullptr,             // Optional user-provided data.
        &fn                  // Output: the created JavaScript function.
    );

    // Add the function to the module exports.
    //
    // JavaScript will be able to call:
    // module.soma(...)
    napi_set_named_property(env, exports, "soma", fn);

    // Return the module exports object.
    return exports;
}

// Register the Init function as the entry point of the native Node.js module.
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)