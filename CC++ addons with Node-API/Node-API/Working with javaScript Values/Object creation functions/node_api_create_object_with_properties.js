
// Declare the resulting JavaScript object
napi_value result;

// Declare property name and value arrays
napi_value names[2];
napi_value values[2];

// Define property names
napi_create_string_utf8(env, "name", NAPI_AUTO_LENGTH, &names[0]);
napi_create_string_utf8(env, "age", NAPI_AUTO_LENGTH, &names[1]);

// Define property values
napi_create_string_utf8(env, "Carlos", NAPI_AUTO_LENGTH, &values[0]);
napi_create_int32(env, 25, &values[1]);

// Create an object with the specified properties
node_api_create_object_with_properties(
    env,
    nullptr, // Use null as the prototype
    names,   // Property names
    values,  // Property values
    2,       // Number of properties
    &result  // Store the created object
);
