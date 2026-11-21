
#include <node_api.h>

// Create a Buffer from an existing ArrayBuffer
napi_value CreateBuffer(napi_env env, napi_callback_info info) {
    napi_value arraybuffer, buffer;
    void* data;

    // Create an ArrayBuffer with 8 bytes
    napi_create_arraybuffer(env, 8, &data, &arraybuffer);

    // Access the ArrayBuffer memory as unsigned bytes
    unsigned char* bytes = (unsigned char*)data;

    // Fill the ArrayBuffer with values from 1 to 8
    for (int i = 0; i < 8; i++) {
        bytes[i] = i + 1;
    }

    // Create a Buffer using bytes 2 to 5
    node_api_create_buffer_from_arraybuffer(
        env,
        arraybuffer,
        2,  // Starting byte offset
        4,  // Buffer length in bytes
        &buffer
    );

    // Return the created Buffer
    return buffer;
}
