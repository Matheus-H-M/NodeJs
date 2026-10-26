// Include the Node.js N-API header.
#include <node_api.h>

// Include the standard library for memory allocation and deallocation.
#include <stdlib.h>

// Define a structure to store cleanup-related data.
struct CleanupData {
    int resource;
};

// Define the asynchronous cleanup hook callback.
static void AsyncCleanupHook(
    napi_async_cleanup_hook_handle handle,
    void* data
) {
    // Convert the generic pointer to a CleanupData pointer.
    CleanupData* cleanupData = (CleanupData*)data;

    // Free the allocated memory.
    free(cleanupData);

    // Remove the asynchronous cleanup hook using its handle.
    napi_remove_async_cleanup_hook(handle);
}

// Define the addon's initialization function.
static napi_value Init(napi_env env, napi_value exports) {
    // Allocate memory for the cleanup data structure.
    CleanupData* data = (CleanupData*)malloc(sizeof(CleanupData));

    // Check whether memory allocation failed.
    if (data == NULL) {
        // Throw a JavaScript error if allocation fails.
        napi_throw_error(env, NULL, "Failed to allocate memory");

        // Return the exports object.
        return exports;
    }

    // Initialize the resource field.
    data->resource = 100;

    // Declare a handle for the asynchronous cleanup hook.
    napi_async_cleanup_hook_handle handle;

    // Register the asynchronous cleanup hook.
    napi_status status = napi_add_async_cleanup_hook(
        env,
        AsyncCleanupHook,
        data,
        &handle
    );

    // Check whether hook registration failed.
    if (status != napi_ok) {
        // Free the allocated memory if registration fails.
        free(data);

        // Throw a JavaScript error.
        napi_throw_error(env, NULL, "Failed to register cleanup hook");

        // Return the exports object.
        return exports;
    }

    // Return the exports object to JavaScript.
    return exports;
}

// Register the addon's initialization function.
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)