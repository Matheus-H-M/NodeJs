#include <node_api.h>

/*
 * This function is the native callback that will be exposed to JavaScript.
 *
 * napi_env:
 *   Represents the Node.js environment in which the callback is running.
 *
 * napi_callback_info:
 *   Contains information about the JavaScript function call,
 *   such as the arguments passed by JavaScript.
 *
 * The function returns a napi_value, which represents a JavaScript value.
 */
napi_value Saludar(napi_env env, napi_callback_info info)
{
    /*
     * This variable will hold the JavaScript string that we create.
     */
    napi_value resultado;

    /*
     * Create a JavaScript string from a UTF-8 C string.
     *
     * env:
     *   The current Node.js environment.
     *
     * "Hello!":
     *   The string that will be returned to JavaScript.
     *
     * NAPI_AUTO_LENGTH:
     *   Tells Node-API to automatically determine the string length.
     *
     * &resultado:
     *   Receives the newly created JavaScript string value.
     */
    napi_create_string_utf8(
        env,
        "Hello! This function was executed in C using napi_callback.",
        NAPI_AUTO_LENGTH,
        &resultado
    );

    /*
     * Return the JavaScript string to the caller.
     */
    return resultado;
}

/*
 * Module initialization function.
 *
 * This function is called when Node.js loads the native addon.
 *
 * env:
 *   The Node.js environment.
 *
 * exports:
 *   The JavaScript object that will contain the functions
 *   exported by this native addon.
 */
napi_value Init(napi_env env, napi_value exports)
{
    /*
     * This variable will hold the JavaScript function created
     * from our native C callback.
     */
    napi_value fn;

    /*
     * Create a JavaScript function backed by our native
     * Saludar() callback.
     *
     * "saludar":
     *   The name of the function.
     *
     * Saludar:
     *   The native C function that will be called when
     *   JavaScript invokes this function.
     *
     * NULL:
     *   No user-defined data is being passed to the callback.
     */
    napi_create_function(
        env,
        "saludar",
        NAPI_AUTO_LENGTH,
        Saludar,
        NULL,
        &fn
    );

    /*
     * Add the native function to the exports object.
     *
     * After this, JavaScript can access the function as:
     *
     *     addon.saludar()
     */
    napi_set_named_property(env, exports, "saludar", fn);

    /*
     * Return the exports object containing our native function.
     */
    return exports;
}

/*
 * Register the Init() function as the initialization function
 * for this Node.js native addon.
 *
 * NODE_GYP_MODULE_NAME is provided by node-gyp and represents
 * the name of the native addon module.
 */
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init);
