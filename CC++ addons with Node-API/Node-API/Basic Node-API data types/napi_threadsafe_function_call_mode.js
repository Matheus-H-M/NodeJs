#include <node_api.h>

// Global ThreadSafeFunction handle.
// This allows native threads to safely call JavaScript code.
napi_threadsafe_function toFontString;

/**
 * This function is called on the JavaScript thread.
 *
 * It receives the JavaScript callback and the data that was
 * sent from the native thread.
 */
void CallJs(
    napi_env env,
    napi_value js_callback,
    void* useContext,
    void* data
) {
    // Make sure the N-API environment and JavaScript callback
    // are valid before trying to call JavaScript.
    if (env == nullptr || js_callback == nullptr) {
        return;
    }

    // This will hold the JavaScript string value.
    napi_value valueOrDefault;

    // Create a JavaScript string from a native C string.
    napi_create_string_utf8(
        env,
        "Message sent from the native thread!",
        NAPI_AUTO_LENGTH,
        &valueOrDefault
    );

    // This will hold the return value of the JavaScript callback.
    napi_value result;

    // Call the JavaScript callback with one argument:
    // the string created above.
    napi_call_function(
        env,
        nullptr,            // "this" value
        js_callback,        // JavaScript callback
        1,                  // Number of arguments
        &valueOrDefault,    // Arguments
        &result             // Callback result
    );
}

/**
 * This function is exposed to JavaScript.
 *
 * JavaScript can call:
 *
 *   addon.start(callback)
 *
 * The callback will later be executed through the ThreadSafeFunction.
 */
napi_value Start(
    napi_env env,
    napi_callback_info info
) {
    // Store the JavaScript callback passed by the user.
    napi_value callback;

    // We expect one argument: the JavaScript callback.
    size_t argc = 1;

    // Get the arguments passed from JavaScript.
    napi_get_cb_info(
        env,
        info,
        &argc,
        &callback,
        nullptr,
        nullptr
    );

    // Create a name for the ThreadSafeFunction.
    // This is useful for debugging and identifying the resource.
    napi_value resource_name;

    napi_create_string_utf8(
        env,
        "MyThreadSafeFunction",
        NAPI_AUTO_LENGTH,
        &resource_name
    );

    // Create the ThreadSafeFunction.
    //
    // The queue can contain up to 10 pending calls.
    // One thread is initially registered.
    napi_create_threadsafe_function(
        env,
        callback,            // JavaScript callback
        nullptr,             // Optional async resource
        resource_name,       // Resource name
        10,                  // Maximum queue size
        1,                   // Initial thread count
        nullptr,             // Finalizer data
        nullptr,             // Finalizer
        nullptr,             // Context
        CallJs,              // Function called on the JavaScript thread
        &toFontString        // Output ThreadSafeFunction handle
    );

    // Call the ThreadSafeFunction using NONBLOCKING mode.
    //
    // If the queue is full, this call returns immediately
    // instead of waiting for space in the queue.
    napi_status status = napi_call_threadsafe_function(
        toFontString,
        nullptr,                 // Data passed to CallJs
        napi_tsfn_nonblocking    // Do not block if the queue is full
    );

    // Check whether the call was successful.
    if (status != napi_ok) {
        napi_throw_error(
            env,
            nullptr,
            "The queue is full or an error occurred."
        );
    }

    // Call the ThreadSafeFunction using BLOCKING mode.
    //
    // If the queue is full, the native thread waits until
    // there is space available in the queue.
    status = napi_call_threadsafe_function(
        toFontString,
        nullptr,                // Data passed to CallJs
        napi_tsfn_blocking      // Wait if the queue is full
    );

    // Check whether the blocking call was successful.
    if (status != napi_ok) {
        napi_throw_error(
            env,
            nullptr,
            "Error while calling the ThreadSafeFunction."
        );
    }

    // Return undefined to JavaScript.
    return nullptr;
}

/**
 * Module initialization function.
 *
 * This function is called when the native addon is loaded.
 */
napi_value Init(
    napi_env env,
    napi_value exports
) {
    // Describe the function that will be exposed to JavaScript.
    //
    // JavaScript will be able to call:
    //
    //   addon.start(callback)
    napi_property_descriptor desc = {
        "start",              // JavaScript property name
        nullptr,              // No getter
        Start,                // Native function
        nullptr,              // No setter
        nullptr,              // No value
        nullptr,              // No getter/setter data
        napi_default,         // Property attributes
        nullptr               // User data
    };

    // Add the "start" function to the module exports.
    napi_define_properties(
        env,
        exports,
        1,
        &desc
    );

    // Return the module exports.
    return exports;
}

// Register the native addon with Node.js.
NAPI_MODULE(
    NODE_GYP_MODULE_NAME,
    Init
);
