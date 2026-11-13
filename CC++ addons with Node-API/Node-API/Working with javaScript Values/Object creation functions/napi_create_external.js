#include <node_api.h>
#include <stdlib.h>

// Free the allocated memory when the external value is garbage collected
void finalize(napi_env env, void* data, void* hint) {
    free(data);
}

// Create an external value containing a native pointer
napi_value CreateExternal(napi_env env, napi_callback_info info) {
    // Allocate memory for an integer
    int* value = (int*)malloc(sizeof(int));
    *value = 123;

    napi_value result;

    // Create a JavaScript external value
    napi_create_external(
        env,
        value,
        finalize,
        NULL,
        &result
    );

    return result;
}

// Initialize and export the native function
napi_value Init(napi_env env, napi_value exports) {
    napi_value fn;

    // Create the JavaScript function
    napi_create_function(
        env, NULL, 0, CreateExternal, NULL, &fn
    );

    // Export the function as createExternal
    napi_set_named_property(env, exports, "createExternal", fn);

    return exports;
}

// Register the Node.js native module
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)