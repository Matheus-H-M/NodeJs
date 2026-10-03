#include <node_api.h>

// Test function that triggers an uncaught JavaScript exception.
napi_value TestScheduler(napi_env env, napi_callback_info info) {
    // Create a JavaScript value to hold the error message.
    napi_value errorContext;

    // Create a UTF-8 JavaScript string containing the error message.
    napi_create_string_utf8(
        env,
        "Unexpected error!",
        NAPI_AUTO_LENGTH,
        &errorContext
    );

    // Trigger the error as an uncaught exception in JavaScript.
    napi_fatal_exception(env, errorContext);

    // Return null because the exception was triggered.
    return nullptr;
}