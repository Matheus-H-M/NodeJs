#include <node_api.h>

// Define a function that will be called from JavaScript.
napi_value Exemplo(napi_env env, napi_callback_info info) {
    // Declare a handle for the escapable handle scope.
    napi_escapable_handle_scope scope;

    // Declare a variable to store the JavaScript string.
    napi_value result;

    // Declare a variable to store the status of each N-API operation.
    napi_status status;

    // Open a new escapable handle scope.
    status = napi_open_escapable_handle_scope(env, &scope);

    // Check whether the scope was opened successfully.
    if (status != napi_ok) {
        return nullptr;
    }

    // Create a JavaScript string inside the current scope.
    status = napi_create_string_utf8(
        env,
        "Hello from Node.js",
        NAPI_AUTO_LENGTH,
        &result
    );

    // If string creation fails, close the scope before returning.
    if (status != napi_ok) {
        napi_close_escapable_handle_scope(env, scope);
        return nullptr;
    }

    // Escape the result so it remains valid outside this scope.
    napi_value escaped_result;
    status = napi_escape_handle(env, scope, result, &escaped_result);

    // Close the scope if escaping fails.
    if (status != napi_ok) {
        napi_close_escapable_handle_scope(env, scope);
        return nullptr;
    }

    // Close the escapable handle scope.
    status = napi_close_escapable_handle_scope(env, scope);

    // Check whether the scope was closed successfully.
    if (status != napi_ok) {
        return nullptr;
    }

    // Return the escaped JavaScript string.
    return escaped_result;
}

// Define the entry point for the Node.js native addon.
NAPI_MODULE_INIT() {
    // Declare a variable to store the exported JavaScript function.
    napi_value function;

    // Create a JavaScript function that calls Exemplo.
    napi_status status = napi_create_function(
        env,
        "exemplo",
        NAPI_AUTO_LENGTH,
        Exemplo,
        nullptr,
        &function
    );

    // Check whether the function was created successfully.
    if (status != napi_ok) {
        return nullptr;
    }

    // Export the function so it can be called from JavaScript.
    status = napi_set_named_property(env, exports, "exemplo", function);

    // Return the exports object.
    return status == napi_ok ? exports : nullptr;
}