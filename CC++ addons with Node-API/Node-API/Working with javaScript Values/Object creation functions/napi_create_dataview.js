#include <node_api.h> // Includes the Node.js Native API header.

// Creates a DataView and returns it to JavaScript.
napi_value CreateView(napi_env env, napi_callback_info info) {
    napi_value buffer, view; // Declares the ArrayBuffer and DataView.
    void* data;              // Pointer to the buffer's memory.

    // Creates an ArrayBuffer with 16 bytes.
    napi_create_arraybuffer(env, 16, &data, &buffer);

    // Creates a DataView over the existing ArrayBuffer.
    napi_create_dataview(
        env,
        8,      // DataView length in bytes.
        buffer, // Existing ArrayBuffer.
        4,      // Starting byte offset.
        &view   // Receives the created DataView.
    );

    return view; // Returns the DataView to JavaScript.
}

// Initializes the Node.js native module.
NAPI_MODULE_INIT() {
    napi_value fn; // Stores the JavaScript function.

    // Creates the createView() JavaScript function.
    napi_create_function(
        env,
        "createView",
        NAPI_AUTO_LENGTH,
        CreateView,
        nullptr,
        &fn
    );

    // Exports createView() so JavaScript can use it.
    napi_set_named_property(env, exports, "createView", fn);

    return exports; // Returns the module exports.
}