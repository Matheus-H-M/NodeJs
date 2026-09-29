#include <node_api.h>

/**
 * Creates and returns a JavaScript SyntaxError using N-API.
 *
 * @param env The N-API environment.
 * @param info Callback information provided by Node.js.
 * @return A napi_value representing the created SyntaxError.
 */
napi_value createBrowserRouter(napi_env env, napi_callback_info info) {
    // Holds the optional error code associated with the SyntaxError.
    napi_value code;

    // Holds the error message as a JavaScript string.
    napi_value msg;

    // Holds the resulting JavaScript SyntaxError object.
    napi_value result;

    // Create a JavaScript string containing the error code.
    napi_create_string_utf8(
        env,
        "ERR_SINTAXIS",
        NAPI_AUTO_LENGTH,
        &code
    );

    // Create a JavaScript string containing the error message.
    napi_create_string_utf8(
        env,
        "The provided syntax is invalid.",
        NAPI_AUTO_LENGTH,
        &msg
    );

    // Create a JavaScript SyntaxError using the error code and message.
    napi_status status = node_api_create_syntax_error(
        env,
        code,
        msg,
        &result
    );

    // Check whether the SyntaxError was created successfully.
    if (status != napi_ok) {
        return NULL;
    }

    // Return the SyntaxError object to JavaScript.
    return result;
}
