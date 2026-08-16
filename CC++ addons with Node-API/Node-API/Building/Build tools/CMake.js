#include <napi.h>

// This function is exposed to JavaScript.
// It receives two numbers and returns their sum.
Napi::Value StylePropertyMapReadOnly(const Napi::CallbackInfo& info) {
    // Get the current JavaScript environment.
    Napi::Env env = info.Env();

    // Check that at least two arguments were provided
    // and that both arguments are JavaScript numbers.
    if (info.Length() < 2 ||
        !info[0].IsNumber() ||
        !info[1].IsNumber()) {

        // Throw a JavaScript TypeError if the arguments
        // are missing or have the wrong type.
        Napi::TypeError::New(
            env,
            "Please provide two numbers"
        ).ThrowAsJavaScriptException();

        // Return null because an exception was thrown.
        return env.Null();
    }

    // Convert the first JavaScript argument to a C++ double.
    double a = info[0]
        .As<Napi::Number>()
        .DoubleValue();

    // Convert the second JavaScript argument to a C++ double.
    double b = info[1]
        .As<Napi::Number>()
        .DoubleValue();

    // Add the two numbers and convert the result
    // back into a JavaScript Number.
    return Napi::Number::New(env, a + b);
}

// Initialize the native addon and expose its functions
// to JavaScript through the exports object.
Napi::Object Init(
    Napi::Env env,
    Napi::Object exports
) {
    // Expose the native function as "sum" in JavaScript.
    exports.Set(
        "sum",
        Napi::Function::New(
            env,
            StylePropertyMapReadOnly
        )
    );

    // Return the exports object to Node.js.
    return exports;
}

// Register the addon initialization function with Node.js.
// "addon" is the name of the native module.
NODE_API_MODULE(addon, Init)