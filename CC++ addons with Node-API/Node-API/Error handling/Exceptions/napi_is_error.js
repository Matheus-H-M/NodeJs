#include <node_api.h>

/*
 * This function checks whether a napi_value represents
 * a JavaScript Error object.
 *
 * napi_env env:
 *   The Node-API environment in which this function runs.
 *
 * napi_callback_info info:
 *   Information about the JavaScript function call.
 */
napi_value VerificarErro(napi_env env, napi_callback_info info) {

    /*
     * This will hold the napi_value that we want to check.
     */
    napi_value value;

    /*
     * Set 'value' to JavaScript undefined.
     *
     * Since undefined is not an Error object,
     * napi_is_error() should return false.
     */
    napi_status status = napi_get_undefined(env, &value);

    /*
     * Always check whether the previous Node-API call succeeded.
     */
    if (status != napi_ok) {
        napi_throw_error(
            env,
            NULL,
            "Failed to get undefined value"
        );

        return NULL;
    }

    /*
     * This variable will receive the result of napi_is_error().
     *
     * true  -> value represents a JavaScript Error object
     * false -> value does not represent an Error object
     */
    bool is_error = false;

    /*
     * Check whether 'value' represents an Error object.
     *
     * napi_is_error() returns napi_ok if the operation succeeds.
     */
    status = napi_is_error(env, value, &is_error);

    /*
     * Check whether napi_is_error() itself failed.
     */
    if (status != napi_ok) {
        napi_throw_error(
            env,
            NULL,
            "Failed to call napi_is_error"
        );

        return NULL;
    }

    /*
     * Convert the C boolean result into a JavaScript boolean.
     *
     * For this example, the result will be:
     *
     * false
     *
     * because 'value' is undefined, not an Error.
     */
    napi_value result;

    status = napi_get_boolean(env, is_error, &result);

    /*
     * Check whether creating the JavaScript boolean succeeded.
     */
    if (status != napi_ok) {
        napi_throw_error(
            env,
            NULL,
            "Failed to create boolean result"
        );

        return NULL;
    }

    /*
     * Return the JavaScript boolean to the caller.
     */
    return result;
}
