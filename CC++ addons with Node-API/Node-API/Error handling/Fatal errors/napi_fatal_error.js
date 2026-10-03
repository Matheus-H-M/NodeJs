#include <node_api.h>

/*
 * This function is called from JavaScript.
 * It intentionally triggers a fatal error that terminates
 * the entire Node.js process.
 */
napi_value ejemplo(napi_env env, napi_callback_info info) {
    /*
     * Report a fatal error.
     *
     * "mi_addon.c" is the location where the error occurred.
     * NAPI_AUTO_LENGTH tells N-API that the string is null-terminated.
     * The message describes the fatal error.
     *
     * This function never returns because the Node.js process
     * will be terminated.
     */
    napi_fatal_error(
        "mi_addon.c",
        NAPI_AUTO_LENGTH,
        "A fatal error occurred in the addon!",
        NAPI_AUTO_LENGTH
    );

    /*
     * This line is never reached, but is required because
     * the function has a napi_value return type.
     */
    return NULL;
}

/*
 * Initialize the native addon and expose the "ejemplo"
 * function to JavaScript.
 */
napi_value Interaction(napi_env env, napi_value exports) {
    napi_value fn;

    /*
     * Create a JavaScript function that calls the native
     * "ejemplo" function.
     */
    napi_create_function(
        env,
        "ejemplo",
        NAPI_AUTO_LENGTH,
        ejemplo,
        NULL,
        &fn
    );

    /*
     * Export the function so it can be called from JavaScript
     * using the name "ejemplo".
     */
    napi_set_named_property(env, exports, "ejemplo", fn);

    /*
     * Return the exports object containing the native function.
     */
    return exports;
}

/*
 * Register the Interaction function as the initialization
 * function for this Node.js native addon.
 */
NAPI_MODULE(NODE_GYP_MODULE_NAME, Interaction)
