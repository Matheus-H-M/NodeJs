
#include <node_api.h>
#include <stdint.h>

// Define the addon initialization function
napi_value Init(napi_env env, napi_value exports) {
    // Declare a JavaScript value
    napi_value number;

    // Convert int64_t to a JavaScript Number
    napi_create_int64(env, 1234567890, &number);

    // Export the number to JavaScript
    napi_set_named_property(env, exports, "number", number);

    // Return the exported properties
    return exports;
}

// Register the Node.js addon
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
