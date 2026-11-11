#include <node_api.h>

// Creates a JavaScript Date object and returns it.
napi_value CreateDate(napi_env env, napi_callback_info info) {
    napi_value result;

    // Timestamp in milliseconds since January 1, 1970 (UTC).
    double time = 179442000000.0;

    // Creates a JavaScript Date object using the N-API function.
    napi_status status = napi_create_date(env, time, &result);

    // Checks whether the Date object was created successfully.
    if (status != napi_ok) {
        napi_throw_error(env, nullptr, "Failed to create Date object");
        return nullptr;
    }

    // Returns the newly created Date object.
    return result;
}

// Initializes the native module and exports its functions.
napi_value Init(napi_env env, napi_value exports) {
    napi_value fn;

    // Creates the JavaScript function named "createDate".
    napi_create_function(
        env,
        "createDate",
        NAPI_AUTO_LENGTH,
        CreateDate,
        nullptr,
        &fn
    );

    // Exports the function so it can be accessed from JavaScript.
    napi_set_named_property(env, exports, "createDate", fn);

    return exports;
}

// Registers the module initialization function.
NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)