#include <node_api.h>
#include <stdlib.h>

// Stores data that belongs to the current Node.js environment.
struct AppData {
    int counter;
};

// This callback is called when the Node.js environment is being destroyed.
//
// `data` contains the pointer that was previously passed to
// `napi_set_instance_data()`.
void FinalizeAppData(napi_env env, void* data, void* hint) {
    // Convert the generic void* pointer back to our AppData structure.
    AppData* app = static_cast<AppData*>(data);

    // Print the counter value before releasing the allocated memory.
    printf("Finalizing AppData. counter = %d\n", app->counter);

    // Free the memory allocated for AppData.
    free(app);
}

// Returns the current counter value to JavaScript.
napi_value GetCounter(napi_env env, napi_callback_info info) {
    // This pointer will receive the AppData associated with the
    // current Node.js environment.
    AppData* appData = nullptr;

    // Retrieve the instance-specific data that was previously stored
    // using napi_set_instance_data().
    napi_status status =
        napi_get_instance_data(
            env,
            reinterpret_cast<void**>(&appData)
        );

    // Make sure the API call succeeded and that AppData exists.
    if (status != napi_ok || appData == nullptr) {
        // Throw a JavaScript error if the data could not be retrieved.
        napi_throw_error(
            env,
            nullptr,
            "AppData not found"
        );

        // Returning nullptr indicates that an exception was thrown.
        return nullptr;
    }

    // Create a JavaScript number containing the counter value.
    napi_value result;
    napi_create_int32(
        env,
        appData->counter,
        &result
    );

    // Return the JavaScript number.
    return result;
}

// Initializes the native addon.
napi_value Init(napi_env env, napi_value exports) {
    // Allocate memory for an AppData instance.
    AppData* appData =
        static_cast<AppData*>(malloc(sizeof(AppData)));

    // Check whether the memory allocation failed.
    if (appData == nullptr) {
        // Throw an error if AppData could not be allocated.
        napi_throw_error(
            env,
            nullptr,
            "Failed to allocate AppData"
        );

        return nullptr;
    }

    // Initialize the counter with a starting value.
    appData->counter = 42;

    // Associate AppData with the current Node.js environment.
    //
    // The same data can later be retrieved using
    // napi_get_instance_data().
    //
    // FinalizeAppData will be called when the environment is destroyed.
    napi_status status = napi_set_instance_data(
        env,
        appData,
        FinalizeAppData,
        nullptr
    );

    // Check whether napi_set_instance_data() succeeded.
    if (status != napi_ok) {
        // If storing the instance data failed, release the allocated memory.
        free(appData);

        // Throw a JavaScript error.
        napi_throw_error(
            env,
            nullptr,
            "Failed to set instance data"
        );

        return nullptr;
    }

    // Create a JavaScript function that calls GetCounter().
    napi_value fn;

    napi_create_function(
        env,
        "getCounter",
        NAPI_AUTO_LENGTH,
        GetCounter,
        nullptr,
        &fn
    );

    // Export the native function as `getCounter`.
    //
    // JavaScript will be able to call:
    //
    // const addon = require('./addon');
    // addon.getCounter();
    napi_set_named_property(
        env,
        exports,
        "getCounter",
        fn
    );

    // Return the module exports.
    return exports;
}

// Entry point of the Node-API addon.
//
// Node.js calls Init() when the native addon is loaded.
NAPI_MODULE_INIT() {
    return Init(env, exports);
}