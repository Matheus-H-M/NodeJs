#include <node.h>
#include <node_object_wrap.h>
#include "myobject.h"

// All addon code is placed inside the "demo" namespace
// to avoid name conflicts with other C++ code.
namespace demo {

// Import commonly used V8 types into the current namespace.
using v8::Context;
using v8::FunctionCallbackInfo;
using v8::Isolate;
using v8::Local;
using v8::Number;
using v8::Object;
using v8::Value;

// This function creates a new MyObject instance.
//
// It receives the arguments passed from JavaScript and
// delegates the object creation to MyObject::NewInstance().
void CreateObject(const FunctionCallbackInfo<Value>& args) {
    MyObject::NewInstance(args);
}

// This function is not needed for the "passing wrapped objects"
// example, so it can be removed.
//
// If you want a separate function named Add, it could be used
// for another operation.
void Add(const FunctionCallbackInfo<Value>& args) {
    // This is just an example call that creates a new object.
    // It does not perform the addition of two wrapped objects.
    MyObject::NewInstance(args);
}

// Adds the values stored inside two MyObject instances.
//
// JavaScript usage:
//
// const obj1 = addon.createObject(10);
// const obj2 = addon.createObject(20);
// const result = addon.add(obj1, obj2);
//
// result === 30
void add(const FunctionCallbackInfo<Value>& args) {

    // Get the current V8 isolate.
    // The isolate represents the V8 JavaScript engine instance
    // in which this function is running.
    Isolate* isolate = args.GetIsolate();

    // Get the current JavaScript execution context.
    Local<Context> context = isolate->GetCurrentContext();

    // Convert the first JavaScript argument into a V8 Object.
    //
    // The object was previously created by MyObject and wrapped
    // using node::ObjectWrap::Wrap().
    //
    // ObjectWrap::Unwrap<MyObject>() retrieves the original
    // C++ MyObject pointer from the JavaScript object.
    MyObject* obj1 =
        node::ObjectWrap::Unwrap<MyObject>(
            args[0]->ToObject(context).ToLocalChecked()
        );

    // Unwrap the second JavaScript argument in the same way.
    //
    // This gives us access to the original C++ MyObject instance
    // associated with the second JavaScript object.
    MyObject* obj2 =
        node::ObjectWrap::Unwrap<MyObject>(
            args[1]->ToObject(context).ToLocalChecked()
        );

    // Get the values stored in both C++ objects and add them.
    //
    // The value() method provides access to MyObject::value_,
    // which is private inside the MyObject class.
    double result =
        obj1->value() + obj2->value();

    // Convert the C++ double result into a JavaScript Number
    // and return it to the JavaScript caller.
    args.GetReturnValue().Set(
        Number::New(isolate, result)
    );
}

// Initialize the Node.js addon.
//
// This function is called by Node.js when the native addon
// is loaded with:
//
// const addon = require('./build/Release/addon');
void InitAll(Local<Object> exports) {

    // Initialize the MyObject class and its constructor.
    MyObject::Init();

    // Expose the createObject() C++ function to JavaScript
    // as addon.createObject().
    NODE_SET_METHOD(
        exports,
        "createObject",
        CreateObject
    );

    // Expose the add() C++ function to JavaScript
    // as addon.add().
    NODE_SET_METHOD(
        exports,
        "add",
        add
    );
}

// Register this C++ module as a Node.js native addon.
//
// NODE_GYP_MODULE_NAME is provided by node-gyp and corresponds
// to the name of the native addon defined in binding.gyp.
NODE_MODULE(NODE_GYP_MODULE_NAME, InitAll)

} // namespace demo