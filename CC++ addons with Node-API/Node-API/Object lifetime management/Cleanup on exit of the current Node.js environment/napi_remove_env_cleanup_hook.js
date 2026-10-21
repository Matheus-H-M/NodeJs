#include <node_api.h>
#include <stdio.h>
#include <stdlib.h>

// Track whether the resource is active.
static int recurso_ativo = 1;

// Cleanup callback executed when the Node.js environment exits.
static void cleanup_hook(void* arg) {
    const char* message = (const char*)arg;

    printf("Cleaning up resource: %s\n", message);
    recurso_ativo = 0;
}

// Register the environment cleanup hook.
static napi_value registrar_hook(
    napi_env env,
    napi_callback_info info
) {
    // Use a static string so the argument remains valid.
    static const char* message = "My resource";

    // Register the cleanup callback with its argument.
    napi_status status = napi_add_env_cleanup_hook(
        env,
        cleanup_hook,
        (void*)message
    );

    // Create an undefined JavaScript return value.
    napi_value result;
    napi_get_undefined(env, &result);

    // Throw an error if registration fails.
    if (status != napi_ok) {
        napi_throw_error(env, NULL, "Failed to register cleanup hook");
    }

    return result;
}

// Remove a previously registered environment cleanup hook.
static napi_value remover_hook(
    napi_env env,
    napi_callback_info info
) {
    // Use the exact same argument as the registration call.
    static const char* message = "My resource";

    // Unregister the cleanup callback.
    napi_status status = napi_remove_env_cleanup_hook(
        env,
        cleanup_hook,
        (void*)message
    );

    // Create an undefined JavaScript return value.
    napi_value result;
    napi_get_undefined(env, &result);

    // Throw an error if removal fails.
    if (status != napi_ok) {
        napi_throw_error(env, NULL, "Failed to remove cleanup hook");
    }

    return result;
}

// Initialize the native addon and export its JavaScript functions.
static napi_value init(
    napi_env env,
    napi_value exports
) {
    napi_value register_function;
    napi_value remove_function;

    // Create the JavaScript function used to register the hook.
    napi_create_function(
        env, "registrarHook", NAPI_AUTO_LENGTH,
        registrar_hook, NULL, &register_function
    );

    // Create the JavaScript function used to remove the hook.
    napi_create_function(
        env, "removerHook", NAPI_AUTO_LENGTH,
        remover_hook, NULL, &remove_function
    );

    // Export both functions to JavaScript.
    napi_set_named_property(env, exports, "registrarHook", register_function);
    napi_set_named_property(env, exports, "removerHook", remove_function);

    return exports;
}

// Define the entry point of the Node.js native addon.
NAPI_MODULE(NODE_GYP_MODULE_NAME, init)