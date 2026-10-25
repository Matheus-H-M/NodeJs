
#include <node_api.h> // Include the Node.js Native API header.

// Cleanup function called when the environment is shutting down.
void Cleanup(napi_async_cleanup_hook_handle handle, void* arg) {
    // Remove the asynchronous cleanup hook.
    napi_remove_async_cleanup_hook(handle);
}

// Initialize the addon and register the cleanup hook.
napi_value Interaction(napi_env env, napi_value exports) {
    // Register the asynchronous cleanup hook.
    napi_add_async_cleanup_hook(env, Cleanup, nullptr, nullptr);

    // Return the exports object.
    return exports;
}

// Register the addon initialization function.
NAPI_MODULE(NODE_GYP_MODULE_NAME, Interaction)
