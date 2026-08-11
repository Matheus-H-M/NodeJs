
#include <node.h>
#include "myobject.h"

// Use the demo namespace to keep our addon code organized
// and avoid naming conflicts with other code.
namespace demo {

using v8::FunctionCallbackInfo;
using v8::Local;
using v8::Object;
using v8::Value;

// Factory function exposed to JavaScript.
//
// Instead of requiring JavaScript to use:
//     new addon.Object()
// JavaScript can simply call:
//     addon.createObject()
//
// This function delegates the actual object creation
// to the MyObject::NewInstance() method.
void CreateObject(const FunctionCallbackInfo<Value>& args) {
    MyObject::NewInstance(args);
}

// Initializes the Node.js addon.
//
// This function is called automatically when Node.js
// loads the native addon.
void InitAll(Local<Object> exports, Local<Object> module) {
    // Initialize the MyObject class and its constructor.
    MyObject::Init();

    // Export CreateObject as the module's main function.
    //
    // This allows JavaScript to do:
    //     const createObject = require('./build/Release/addon');
    //
    // And then:
    //     const obj = createObject(10);
    NODE_SET_METHOD(module, "exports", CreateObject);
}

// Register the addon with Node.js.
//
// NODE_MODULE connects the native C++ addon with
// Node.js so that it can be loaded using require().
NODE_MODULE(NODE_GYP_MODULE_NAME, InitAll)

} // namespace demo
