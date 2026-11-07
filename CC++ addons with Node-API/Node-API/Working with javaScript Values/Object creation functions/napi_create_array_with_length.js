
#include <node_api.h>

// Function that creates a JavaScript array
napi_value CreateArray(napi_env env, napi_callback_info info) {
    // Declare a variable to store the array
    napi_value array;

    // Create an array with an initial length of 5
    napi_status status = napi_create_array_with_length(
        env,
        5,
        &array
    );

    // Check if the array creation was successful
    if (status != napi_ok) {
        // Throw an error if the operation failed
        napi_throw_error(env, NULL, "Failed to create array");
        return NULL;
    }

    // Return the created array
    return array;
}
