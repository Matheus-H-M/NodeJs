
#include <node_api.h>
#include <stdlib.h>
#include <string.h>

// Callback called when the Buffer is garbage collected
void finalize(napi_env env, void* data, void* hint) {
    // Free the allocated native memory
    free(data);
}

// Function that creates an external Buffer
napi_value CreateBuffer(napi_env env, napi_callback_info info) {
    // Variable to store the resulting Buffer
    napi_value result;

    // Define the Buffer size
    size_t length = 5;

    // Allocate native memory
    char* data = (char*)malloc(length);

    // Copy the string into the allocated memory
    memcpy(data, "Hello", length);

    // Create a JavaScript Buffer backed by external memory
    napi_create_external_buffer(
        env,
        length,
        data,
        finalize,
        nullptr,
        &result
    );

    // Return the Buffer to JavaScript
    return result;
}

// Function that registers the native function
napi_value Init(napi_env env, napi_value exports) {
    // Variable to store the JavaScript function
    napi_value fn;

    // Create the JavaScript function
    napi_create_function(
        env,
        "createBuffer",
        NAPI_AUTO_LENGTH,
        CreateBuffer,
        nullptr,
        &fn
    );

    // Export the function to JavaScript
    napi_set_named_property(env, exports, "createBuffer", fn);

    // Return the module exports
    return exports;
}

// Register the Node.js native addon
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
