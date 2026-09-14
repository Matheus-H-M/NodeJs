#include <node_api.h>
#include <stdlib.h>

// Stores all data needed by the asynchronous operation.
typedef struct {
    // Handle to the asynchronous work.
    napi_async_work worker;

    // Deferred object used to resolve or reject the JavaScript Promise.
    napi_deferred deferred;

    // Result produced by the asynchronous operation.
    int result;
} AsyncData;


// This function runs on a worker thread.
//
// IMPORTANT:
// JavaScript APIs should generally NOT be called here because this function
// does not run on the JavaScript main thread.
void executeSchedule(napi_env env, void* data) {
    // Convert the generic data pointer back to our AsyncData structure.
    AsyncData* asyncData = (AsyncData*)data;

    // Simulate a long-running operation and store its result.
    asyncData->result = 42;
}


// This is the napi_async_complete_callback.
//
// It runs on the JavaScript thread after the worker function has completed.
//
// Parameters:
//   env    -> The N-API environment.
//   status -> Indicates whether the asynchronous operation succeeded.
//   data   -> Pointer to the data passed to napi_create_async_work().
void OfflineAudioCompletionEvent(
    napi_env env,
    napi_status status,
    void* data
) {
    // Convert the generic data pointer back to our AsyncData structure.
    AsyncData* asyncData = (AsyncData*)data;

    // Check whether the asynchronous operation completed successfully.
    if (status == napi_ok) {

        // JavaScript value that will contain the result.
        napi_value result;

        // Convert the C integer result into a JavaScript Number.
        napi_create_int32(
            env,
            asyncData->result,
            &result
        );

        // Resolve the JavaScript Promise with the result.
        napi_resolve_deferred(
            env,
            asyncData->deferred,
            result
        );

    } else {

        // JavaScript value containing the error message.
        napi_value error;

        // Create a JavaScript string containing the error message.
        napi_create_string_utf8(
            env,
            "Asynchronous operation failed",
            NAPI_AUTO_LENGTH,
            &error
        );

        // Reject the JavaScript Promise with the error.
        napi_reject_deferred(
            env,
            asyncData->deferred,
            error
        );
    }

    // Delete the asynchronous work object because it is no longer needed.
    napi_delete_async_work(
        env,
        asyncData->worker
    );

    // Free the memory allocated for AsyncData.
    free(asyncData);
}


// JavaScript-callable function.
//
// This function creates a Promise, schedules the asynchronous work,
// and returns the Promise to JavaScript.
napi_value AsyncFunction(
    napi_env env,
    napi_callback_info info
) {
    // JavaScript Promise that will be returned to the caller.
    napi_value promise;

    // Allocate memory for the asynchronous operation data.
    AsyncData* asyncData =
        (AsyncData*)malloc(sizeof(AsyncData));

    // Create a Promise and obtain its deferred object.
    napi_create_promise(
        env,
        &asyncData->deferred,
        &promise
    );

    // Name used to identify the asynchronous resource.
    napi_value resource_name;

    // Create a JavaScript string for the resource name.
    napi_create_string_utf8(
        env,
        "AsyncOperation",
        NAPI_AUTO_LENGTH,
        &resource_name
    );

    // Create the asynchronous work.
    //
    // executeSchedule() runs on a worker thread.
    // OfflineAudioCompletionEvent() runs after the work completes
    // on the JavaScript thread.
    napi_create_async_work(
        env,
        NULL,
        resource_name,
        executeSchedule,
        OfflineAudioCompletionEvent,
        asyncData,
        &asyncData->worker
    );

    // Add the asynchronous work to Node.js's worker queue.
    napi_queue_async_work(
        env,
        asyncData->worker
    );

    // Return the Promise to JavaScript.
    return promise;
}


// Module initialization function.
//
// This function is called when the native addon is loaded by Node.js.
napi_value Init(
    napi_env env,
    napi_value exports
) {
    // JavaScript function that will be exposed by the addon.
    napi_value fn;

    // Create the JavaScript function.
    napi_create_function(
        env,
        "asyncFunction",
        NAPI_AUTO_LENGTH,
        AsyncFunction,
        NULL,
        &fn
    );

    // Export the function as "asyncFunction".
    napi_set_named_property(
        env,
        exports,
        "asyncFunction",
        fn
    );

    // Return the module exports object.
    return exports;
}


// Register the native addon initialization function with Node.js.
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
