#include <node_api.h>
#include <stdlib.h>

// This cleanup function is called when the Node.js environment
// is being torn down.
//
// The `data` parameter contains the value that was passed to
// `napi_add_env_cleanup_hook()`.
void cleanup(void* data) {
    // Convert the generic void pointer back to a string pointer.
    const char* message = (const char*)data;

    // Print a message when the cleanup hook is executed.
    printf("Cleanup: %s\n", message);
}

// Module initialization function.
//
// This function is called when the native Node.js module
// is loaded.
napi_value Init(napi_env env, napi_value exports) {
    // Message that will be passed to the cleanup hook.
    //
    // It is a string literal, so it remains valid for the
    // lifetime of the program.
    const char* message = "Environment is being torn down";

    // Register the cleanup hook for this Node.js environment.
    //
    // `env`     -> The current Node.js environment.
    // `cleanup` -> Function that will be called during teardown.
    // `message` -> User data passed to the cleanup function.
    napi_add_env_cleanup_hook(env, cleanup, (void*)message);

    // Return the module's exports.
    return exports;
}

// Define the entry point of the native Node.js module.
//
// Node.js calls `Init()` when the module is loaded.
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
