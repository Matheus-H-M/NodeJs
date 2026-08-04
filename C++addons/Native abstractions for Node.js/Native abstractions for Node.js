// Includes the NAN (Native Abstractions for Node.js) library.
// NAN provides a compatibility layer between different versions
// of Node.js and the V8 JavaScript engine.
#include <nan.h>

// Declares a native method that can be called from JavaScript.
NAN_METHOD(Hello) {

    // Sets the return value of the function.
    // Nan::New() creates a new V8 string, and ToLocalChecked()
    // converts it into a local V8 handle.
    info.GetReturnValue().Set(
        Nan::New("Hello from the native addon using NAN!")
            .ToLocalChecked()
    );
}

// Initializes the native addon when it is loaded by Node.js.
NAN_MODULE_INIT(Init) {

    // Exposes the native function to JavaScript.
    // The function will be available as:
    // const addon = require('./build/Release/hello');
    // addon.hello();
    Nan::Set(
        target,
        Nan::New("hello").ToLocalChecked(),
        Nan::GetFunction(
            Nan::New<v8::FunctionTemplate>(Hello)
        ).ToLocalChecked()
    );
}

// Registers the addon with Node.js.
// The first argument is the module name,
// and the second is the initialization function.
NODE_MODULE(hello, Init)