
#include <node_api.h>
#include <cstdlib>

// Free the externally allocated memory when the buffer is collected.
void finalize(void* data, void* hint) {
    free(data);
}

// Initialize the Node.js native addon.
NAPI_MODULE_INIT() {
    // Allocate 1024 bytes of external memory.
    void* memory = malloc(1024);
    napi_value buffer;

    // Create a SharedArrayBuffer using the external memory.
    node_api_create_external_sharedarraybuffer(
        env, memory, 1024, finalize, nullptr, &buffer
    );

    // Export the SharedArrayBuffer to JavaScript.
    napi_set_named_property(env, exports, "buffer", buffer);

    return exports;
}
