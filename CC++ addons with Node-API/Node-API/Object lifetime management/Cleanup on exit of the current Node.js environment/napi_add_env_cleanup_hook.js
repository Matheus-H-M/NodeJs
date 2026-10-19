#include <node_api.h>
#include <stdio.h>
#include <stdlib.h>

// Define a structure to store cleanup information.
typedef struct {
    int id;
} CleanupData;

// Cleanup callback executed when the Node.js environment exits.
void cleanup(void* arg) {
    // Cast the argument to a CleanupData pointer.
    CleanupData* data = (CleanupData*)arg;

    // Print the resource ID before releasing the memory.
    printf("Cleaning up resource %d before Node.js exits\n",
           data->id);

    // Release the allocated memory.
    free(data);
}

// Initialize the native Node.js addon.
napi_value Init(napi_env env, napi_value exports) {
    // Allocate memory for two cleanup data structures.
    CleanupData* data1 = (CleanupData*)malloc(sizeof(CleanupData));
    CleanupData* data2 = (CleanupData*)malloc(sizeof(CleanupData));

    // Check whether memory allocation failed.
    if (data1 == NULL || data2 == NULL) {
        // Free any memory that was successfully allocated.
        free(data1);
        free(data2);

        // Throw an error in the Node.js environment.
        napi_throw_error(env, NULL, "Failed to allocate memory");
        return NULL;
    }

    // Assign unique IDs to the cleanup data structures.
    data1->id = 1;
    data2->id = 2;

    // Register the first cleanup hook.
    napi_status status = napi_add_env_cleanup_hook(
        env, cleanup, data1
    );

    // Handle failure to register the first cleanup hook.
    if (status != napi_ok) {
        free(data1);
        free(data2);

        napi_throw_error(env, NULL, "Failed to register cleanup hook 1");
        return NULL;
    }

    // Register the second cleanup hook.
    status = napi_add_env_cleanup_hook(
        env, cleanup, data2
    );

    // Handle failure to register the second cleanup hook.
    if (status != napi_ok) {
        // Remove the first hook because initialization failed.
        napi_remove_env_cleanup_hook(env, cleanup, data1);

        // Free both allocated data structures.
        free(data1);
        free(data2);

        // Throw an error in the Node.js environment.
        napi_throw_error(env, NULL, "Failed to register cleanup hook 2");
        return NULL;
    }

    // Return the exports object to complete addon initialization.
    return exports;
}

// Define the entry point for the native Node.js addon.
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)