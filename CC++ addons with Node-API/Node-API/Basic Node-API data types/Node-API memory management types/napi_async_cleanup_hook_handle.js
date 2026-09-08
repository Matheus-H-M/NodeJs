// Include the Node.js N-API header.
// This provides the types and functions used to create native Node.js addons.
#include <node_api.h>

// Include the standard C input/output library.
// We use printf() to display messages in the terminal.
#include <stdio.h>

// This structure stores information needed by the cleanup hook.
struct CleanupData {
    // This is an opaque handle returned by napi_add_async_cleanup_hook().
    // The handle must later be passed to napi_remove_async_cleanup_hook().
    napi_async_cleanup_hook_handle handle;
};

// This function is called when Node.js starts the asynchronous cleanup process.
void CleanupHook(void* arg) {
    // Convert the generic void pointer back to our CleanupData structure.
    CleanupData* data = static_cast<CleanupData*>(arg);

    // Print a message showing that asynchronous cleanup has started.
    printf("Async cleanup started!\n");

    // Remove the asynchronous cleanup hook.
    // The handle must be the same handle returned by
    // napi_add_async_cleanup_hook().
    napi_remove_async_cleanup_hook(data->handle);

    // Print a message showing that asynchronous cleanup has finished.
    printf("Async cleanup finished!\n");

    // Free the memory that was allocated with new.
    delete data;
}

// This function initializes the native addon.
napi_value Init(napi_env env, napi_value exports) {

    // Allocate memory for our cleanup data.
    CleanupData* data = new CleanupData();

    // Register the asynchronous cleanup hook with Node.js.
    //
    // env:
    //   The current N-API environment.
    //
    // CleanupHook:
    //   The function Node.js will call during cleanup.
    //
    // data:
    //   User-defined data that will be passed to CleanupHook().
    //
    // &data->handle:
    //   Node.js writes the cleanup hook handle into this variable.
    napi_status status = napi_add_async_cleanup_hook(
        env,
        CleanupHook,
        data,
        &data->handle
    );

    // Check whether registering the cleanup hook failed.
    if (status != napi_ok) {

        // Free the memory because the hook was not registered successfully.
        delete data;

        // Throw a JavaScript error from the native addon.
        napi_throw_error(
            env,
            nullptr,
            "Failed to add async cleanup hook"
        );

        // Return nullptr because initialization failed.
        return nullptr;
    }

    // Return the exports object so the addon can be used by Node.js.
    return exports;
}

// This macro creates the entry point used by Node.js
// to initialize the native addon.
NAPI_MODULE_INIT() {

    // Call our initialization function.
    return Init(env, exports);
}
