#include <node_api.h>
#include <stdlib.h>

// Structure used to store data associated with the
// current Node.js environment.
typedef struct {
    int counter;
} AppData;

// JavaScript-callable function that retrieves the
// counter stored in the current Node.js environment.
napi_value getCounter(napi_env env, napi_callback_info info) {
    // Pointer that will receive the instance data.
    AppData* data = NULL;

    // Retrieve the data previously associated with
    // this Node.js environment using napi_set_instance_data().
    napi_status status = napi_get_instance_data(
        env,
        (void**)&data
    );

    // Check whether the operation succeeded and
    // whether instance data was actually found.
    if (status != napi_ok || data == NULL) {
        napi_throw_error(
            env,
            NULL,
            "Instance data not found"
        );

        return NULL;
    }

    // napi_value represents a JavaScript value.
    napi_value result;

    // Convert the C integer into a JavaScript Number
    // and store it in the result variable.
    napi_create_int32(
        env,
        data->counter,
        &result
    );

    // Return the counter to JavaScript.
    return result;
}

// Cleanup function called when the Node.js environment
// is being destroyed.
void finalizeData(
    napi_env env,
    void* data,
    void* hint
) {
    // Convert the generic void pointer back to AppData.
    AppData* appData = (AppData*)data;

    // Release the memory allocated for AppData.
    free(appData);
}

// Module initialization function.
// This function is called when the native addon is loaded.
napi_value Init(
    napi_env env,
    napi_value exports
) {
    // Allocate memory for the application data.
    AppData* data = (AppData*)malloc(sizeof(AppData));

    // Check whether the memory allocation succeeded.
    if (data == NULL) {
        napi_throw_error(
            env,
            NULL,
            "Failed to allocate memory"
        );

        return NULL;
    }

    // Initialize the counter with the value 42.
    data->counter = 42;

    // Associate the AppData pointer with the current
    // Node.js environment.
    //
    // The finalizeData function will be called automatically
    // when the environment is destroyed.
    napi_set_instance_data(
        env,
        data,
        finalizeData,
        NULL
    );

    // Variable that will hold the JavaScript function.
    napi_value fn;

    // Create a JavaScript function named "getCounter".
    napi_create_function(
        env,
        "getCounter",
        NAPI_AUTO_LENGTH,
        getCounter,
        NULL,
        &fn
    );

    // Export the function so it can be accessed from JavaScript.
    //
    // JavaScript usage:
    // addon.getCounter()
    napi_set_named_property(
        env,
        exports,
        "getCounter",
        fn
    );

    // Return the module exports object.
    return exports;
}

// Register the native addon initialization function
// with Node.js.
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)