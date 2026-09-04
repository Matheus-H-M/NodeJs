#include <node_api.h>

// Native callback function exposed to JavaScript.
napi_value callback(napi_env env, napi_callback_info info) {
    // Declare a handle scope.
    // A handle scope controls the lifetime of napi_value handles
    // created within this scope.
    napi_handle_scope scope;

    // Declare a JavaScript value that will hold the result.
    napi_value result;

    // Open a new handle scope.
    // Any temporary napi_values created after this point
    // belong to this handle scope.
    napi_open_handle_scope(env, &scope);

    // Create a JavaScript string.
    // The resulting napi_value is stored in "result".
    napi_create_string_utf8(
        env,
        "Hello from Node-API!",
        NAPI_AUTO_LENGTH,
        &result
    );

    // Close the handle scope.
    // This tells Node-API that the values created in this scope
    // are no longer needed by the current native stack frame.
    napi_close_handle_scope(env, scope);

    // Return the JavaScript value to the caller.
    return result;
}

// Module initialization function.
// This function is called when the native addon is loaded.
napi_value Init(napi_env env, napi_value exports) {
    // Declare a napi_value that will represent
    // the JavaScript function.
    napi_value fn;

    // Create a JavaScript function that calls our native "callback"
    // function when invoked from JavaScript.
    napi_create_function(
        env,
        "callback",
        NAPI_AUTO_LENGTH,
        callback,
        nullptr,
        &fn
    );

    // Add the native function to the module exports.
    // JavaScript will be able to call it as:
    // addon.callback()
    napi_set_named_property(env, exports, "callback", fn);

    // Return the module exports object.
    return exports;
}

// Register the initialization function with Node.js.
// NODE_GYP_MODULE_NAME is provided by node-gyp during compilation.
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
