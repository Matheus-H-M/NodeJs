#include <node_api.h>

/*
 * Example of using napi_get_and_clear_last_exception
 *
 * This function:
 *   1. Checks whether a JavaScript exception is pending.
 *   2. Retrieves that exception in `exception`.
 *   3. Clears the exception from the environment.
 *
 * Added in Node.js v8.0.0
 * N-API Version: 1
 */

napi_value get_pending_exception(napi_env env, napi_callback_info info)
{
    napi_value exception = NULL;

    /*
     * This API can be called even when there is
     * a pending JavaScript exception.
     */
    napi_status status =
        napi_get_and_clear_last_exception(env, &exception);

    if (status != napi_ok) {
        /*
         * The API call failed.
         */
        return NULL;
    }

    if (exception != NULL) {
        /*
         * A JavaScript exception was pending.
         *
         * `exception` now contains the JavaScript
         * value representing that exception.
         *
         * The exception has also been cleared
         * from the environment.
         */
    }

    /*
     * If there was no pending exception,
     * `exception` remains NULL.
     */
    return exception;
}
