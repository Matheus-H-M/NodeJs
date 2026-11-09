#include <node_api.h>

// Creates a Node.js Buffer containing the text "Hello".
napi_value CreateBuffer(napi_env env, napi_callback_info info) {
    // Declare the Buffer result and memory pointer.
    napi_value result;
    void* data;

    // Allocate a Buffer with 5 bytes.
    napi_create_buffer(env, 5, &data, &result);

    // Cast the memory pointer to an unsigned char pointer.
    unsigned char* bytes = (unsigned char*)data;

    // Write each character into the Buffer.
    bytes[0] = 'H';
    bytes[1] = 'e';
    bytes[2] = 'l';
    bytes[3] = 'l';
    bytes[4] = 'o';

    // Return the Buffer to JavaScript.
    return result;
}