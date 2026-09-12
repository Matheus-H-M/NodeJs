#include <node_api.h>  // Provides the Node-API (N-API) types and functions.
#include <stdlib.h>    // Provides malloc() and free() for dynamic memory management.

/*
 * A custom structure that will be allocated dynamically.
 *
 * This data can be associated with a finalizer and later
 * released when the finalizer is executed.
 */
typedef struct {
    int value;  // Stores an integer value.
} MyData;

/*
 * Finalizer function.
 *
 * A napi_finalize function is called when the finalizer
 * registered with Node-API is executed.
 *
 * Parameters:
 *   env           - The N-API environment.
 *   finalize_data - Pointer to the data that should be finalized.
 *   finalize_hint - Optional user-defined hint.
 */
static void my_finalizer(
    napi_env env,
    void* finalize_data,
    void* finalize_hint) {

    /*
     * Convert the generic void pointer back to our
     * original MyData structure.
     */
    MyData* data = (MyData*)finalize_data;

    /*
     * Print the value stored in the structure.
     *
     * The finalizer is responsible for cleaning up
     * resources associated with finalize_data.
     */
    printf("Finalizer executed! Value: %d\n", data->value);

    /*
     * Release the memory that was allocated with malloc().
     */
    free(data);
}

/*
 * JavaScript function exposed by the native addon.
 *
 * This function creates a JavaScript object and schedules
 * a finalizer using node_api_post_finalizer().
 */
static napi_value create_object(
    napi_env env,
    napi_callback_info info) {

    /*
     * This variable will hold the JavaScript object
     * created by N-API.
     */
    napi_value obj;

    /*
     * Allocate memory for our native MyData structure.
     */
    MyData* data = malloc(sizeof(MyData));

    /*
     * Store a value inside the allocated structure.
     */
    data->value = 123;

    /*
     * Create an empty JavaScript object.
     */
    napi_create_object(env, &obj);

    /*
     * Schedule the finalizer.
     *
     * node_api_post_finalizer() allows us to schedule
     * a group of Node-API calls to be executed after
     * a garbage collection cycle has completed.
     *
     * Arguments:
     *   env            - Current N-API environment.
     *   my_finalizer   - Function that will be called.
     *   data           - Data passed to the finalizer.
     *   NULL           - Optional finalizer hint.
     */
    node_api_post_finalizer(
        env,
        my_finalizer,
        data,
        NULL
    );

    /*
     * Return the JavaScript object to the caller.
     */
    return obj;
}

/*
 * Module initialization function.
 *
 * This function is executed when Node.js loads the native addon.
 */
static napi_value Init(
    napi_env env,
    napi_value exports) {

    /*
     * This variable will hold the JavaScript function
     * that will be exposed by the addon.
     */
    napi_value fn;

    /*
     * Create a JavaScript function named "createObject".
     *
     * When JavaScript calls createObject(), Node.js will
     * execute the native create_object() function.
     */
    napi_create_function(
        env,
        "createObject",
        NAPI_AUTO_LENGTH,
        create_object,
        NULL,
        &fn
    );

    /*
     * Add the native function to the module's exports.
     *
     * JavaScript will be able to use:
     *
     * const addon = require('./addon');
     * addon.createObject();
     */
    napi_set_named_property(
        env,
        exports,
        "createObject",
        fn
    );

    /*
     * Return the module exports object.
     */
    return exports;
}

/*
 * Register the initialization function with Node.js.
 *
 * NODE_GYP_MODULE_NAME is normally defined automatically
 * when building the addon with node-gyp.
 */
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
