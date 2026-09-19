#include <node_api.h>
#include <stdio.h>
#include <string.h>

// This function demonstrates how to retrieve information
// about the last error that occurred in a Node-API environment.
napi_value ejemplo(napi_env env, napi_callback_info info) {
    napi_status status;

    // This variable would normally contain a JavaScript value.
    // We intentionally pass NULL to napi_get_value_int32()
    // to trigger a Node-API error.
    napi_value valueOrDefault;

    status = napi_get_value_int32(env, NULL, NULL);

    // Check whether the previous Node-API call failed.
    if (status != napi_ok) {
        // Pointer to the structure containing extended information
        // about the last Node-API error.
        const napi_extended_error_info* error_info = NULL;

        // Retrieve information about the last error.
        status = napi_get_last_error_info(env, &error_info);

        // Check that napi_get_last_error_info() succeeded
        // and that the returned error information is not NULL.
        if (status == napi_ok && error_info != NULL) {

            // Create a local buffer to store a copy of the error message.
            // The error_message pointer is only guaranteed to remain valid
            // until another Node-API function is called.
            char mensaje[512] = {0};

            // Make sure the error message exists before copying it.
            if (error_info->error_message != NULL) {
                // Copy the error message into our local buffer.
                // This allows us to safely use the message later.
                strncpy(
                    mensaje,
                    error_info->error_message,
                    sizeof(mensaje) - 1
                );
            }

            // Print the Node-API error code.
            printf("Error code: %d\n", error_info->error_code);

            // Print the error message.
            printf("Message: %s\n", mensaje);

            // Print the napi_status value associated with the error.
            printf("napi_status: %d\n", error_info->status);
        }
    }

    // Return NULL because this example does not create
    // or return a JavaScript value.
    return NULL;
}
