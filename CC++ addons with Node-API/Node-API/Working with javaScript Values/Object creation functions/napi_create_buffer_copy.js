
#include <node_api.h>

// Creates a Buffer by copying the provided data.
napi_value CreateBuffer(napi_env env, napi_value exports) {
    // Defines the original string.
    char data[] = "Hello N-API!";

    // Declares the Buffer variable.
    napi_value buffer;

    // Creates a new Buffer and copies the data into it.
    napi_create_buffer_copy(
        env,
        sizeof(data) - 1, // Data size in bytes, excluding the null terminator.
        data,             // Source data to copy.
        nullptr,          // Optional pointer to the copied data.
        &buffer           // Receives the created Buffer.
    );

    // Returns the created Buffer.
    return buffer;
}
