
#include <node_api.h>

// Function that creates a JavaScript Symbol
napi_value CreateSymbol(napi_env env, napi_callback_info info) {

    // Declare a variable to store the Symbol description
    napi_value description;

    // Declare a variable to store the resulting Symbol
    napi_value result;

    // Create a JavaScript string with the description "MySymbol"
    napi_create_string_utf8(
        env, "MySymbol", NAPI_AUTO_LENGTH, &description
    );

    // Create a JavaScript Symbol using the description
    napi_create_symbol(env, description, &result);

    // Return the created Symbol
    return result;
}
