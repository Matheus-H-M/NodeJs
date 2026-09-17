#include <node_api.h>   // Provides the Node.js N-API interface.
#include <thread>      // Provides support for creating and managing threads.
#include <chrono>      // Provides time-related utilities and durations.
#include <iostream>    // Provides standard input/output functionality.


// Structure used to store data associated with the resource
// that needs to be cleaned up.
struct CleanupData {
    int resourceId;    // Identifier of the resource being managed.
};


// Cleanup hook function called by Node.js during environment cleanup.
//
// The 'handle' identifies this asynchronous cleanup hook.
// The 'data' pointer contains the user-defined cleanup data.
void cleanupHook(
    napi_async_cleanup_hook_handle handle,
    void* data
) {
    // Convert the generic void pointer back to a CleanupData pointer.
    CleanupData* cleanupData = static_cast<CleanupData*>(data);

    // Print the resource ID before releasing the resource.
    std::cout << "Cleaning up resource: "
              << cleanupData->resourceId << std::endl;

    // Release the memory allocated for the CleanupData structure.
    delete cleanupData;

    // Remove the asynchronous cleanup hook from Node.js.
    napi_remove_async_cleanup_hook(handle);
}
