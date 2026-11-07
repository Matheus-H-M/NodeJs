#include <node_api.h>

// Function that creates and returns a JavaScript array
napi_value CreateArray(napi_env env, napi_callback_info info) {
    napi_value array;

    // Create a new JavaScript array
    napi_status status = napi_create_array(env, &array);

    // Check if the array was created successfully
    if (status != napi_ok) {
        napi_throw_error(env, NULL, "Failed to create array");
        return NULL;
    }

    // Return the created array
    return array;
}

// Initialize the Node.js native module
NAPI_MODULE_INIT() {
    napi_value func;

    // Create a JavaScript function that calls CreateArray
    napi_create_function(
        env,
        "createArray",
        NAPI_AUTO_LENGTH,
        CreateArray,
        NULL,
        &func
    );

    // Export the function so it can be used in JavaScript
    napi_set_named_property(env, exports, "createArray", func);

    // Return the module exports
    return exports;
}