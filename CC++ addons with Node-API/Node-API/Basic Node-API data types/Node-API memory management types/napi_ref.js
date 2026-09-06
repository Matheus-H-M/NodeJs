#include <node_api.h>

// This function creates a JavaScript object and a napi_ref
// that can be used to control the object's lifetime.
napi_value create_reference(napi_env env, napi_callback_info info) {

    // Create a JavaScript object.
    napi_value object;
    napi_create_object(env, &object);

    // Declare a napi_ref.
    // A napi_ref is a reference to a napi_value.
    // The reference count of 1 means that this reference
    // keeps the JavaScript object alive.
    napi_ref reference;
    napi_create_reference(env, object, 1, &reference);

    // Delete the reference when it is no longer needed.
    // After this, the reference no longer keeps the object alive.
    napi_delete_reference(env, reference);

    // Return the JavaScript object to the caller.
    return object;
}