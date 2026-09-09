#include <node_api.h>

// This function is called from JavaScript.
// `env` represents the N-API environment.
// `info` contains information about the current callback invocation,
// including the arguments passed from JavaScript.
napi_value MiFuncion(napi_env env, napi_callback_info info) {

    // Maximum number of arguments we want to retrieve.
    size_t argc = 1;

    // Array that will store the JavaScript arguments.
    napi_value args[1];

    // Get information about the callback invocation.
    // `argc` receives the actual number of arguments.
    // `args` receives the JavaScript arguments.
    // The last two parameters can be used to retrieve `this`
// and user-provided callback data.
    napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);

    // Create a JavaScript string.
    napi_value resultado;

    // Create the string "Hello from N-API".
    // The resulting JavaScript string is stored in `resultado`.
    napi_create_string_utf8(
        env,
        "Hello from N-API",
        NAPI_AUTO_LENGTH,
        &resultado
    );

    // Return the JavaScript string to the caller.
    return resultado;
}

// This function initializes the native addon.
// Node.js calls this function when the addon is loaded.
napi_value Init(napi_env env, napi_value exports) {

    // This variable will hold the JavaScript function.
    napi_value fn;

    // Create a JavaScript function named "miFunction".
    // When JavaScript calls this function, Node.js will execute `MiFuncion`.
    napi_create_function(
        env,
        "miFunction",
        NAPI_AUTO_LENGTH,
        MiFuncion,
        nullptr,
        &fn
    );

    // Add the native function to the module exports.
    // JavaScript will be able to call:
    // require('./addon').miFunction()
    napi_set_named_property(
        env,
        exports,
        "miFunction",
        fn
    );

    // Return the module exports object.
    return exports;
}

// Register the `Init` function as the entry point of the Node.js addon.
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
