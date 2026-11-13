#include <node_api.h>
#include <stdlib.h>
#include <string.h>

// Callback executed when the ArrayBuffer is garbage collected
void finalize(napi_env env, void* data, void* hint) {
    free(data); // Release the allocated memory
}

// Creates an ArrayBuffer using externally allocated memory
napi_value createBuffer(napi_env env, napi_callback_info info) {

    // Allocate 1024 bytes of memory
    void* data = malloc(1024);

    // Check if memory allocation was successful
    if (data == NULL) {
        napi_throw_error(env, NULL, "Memory allocation failed");
        return NULL;
    }

    // Fill the memory with the value 65 (ASCII character 'A')
    memset(data, 65, 1024);

    // Variable to store the resulting JavaScript ArrayBuffer
    napi_value result;

    // Create an external ArrayBuffer
    napi_status status = napi_create_external_arraybuffer(
        env, data, 1024, finalize, NULL, &result
    );

    // Check if the operation was successful
    if (status != napi_ok) {
        free(data); // Release memory if creation fails
        napi_throw_error(env, NULL, "Buffer creation failed");
        return NULL;
    }

    // Return the ArrayBuffer to JavaScript
    return result;
}

// Initialize the Node.js addon and export the function
NAPI_MODULE_INIT() {

    napi_value fn;

    // Create the JavaScript function
    napi_create_function(
        env, "createBuffer", NAPI_AUTO_LENGTH,
        createBuffer, NULL, &fn
    );

    // Export the function as createBuffer
    napi_set_named_property(env, exports, "createBuffer", fn);

    return exports;
}