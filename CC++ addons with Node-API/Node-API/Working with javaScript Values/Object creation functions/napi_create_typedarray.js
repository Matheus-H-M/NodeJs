// Declare the ArrayBuffer and TypedArray variables
napi_value buffer, result;
void* data;

// Create an ArrayBuffer to store 4 float values
napi_create_arraybuffer(env, 4 * sizeof(float),
                        &data, &buffer);

// Get a pointer to the buffer data
float* values = (float*)data;

// Assign values to the array
values[0] = 10.5;
values[1] = 20.5;
values[2] = 30.5;
values[3] = 40.5;

// Create a Float32Array using the existing ArrayBuffer
napi_create_typedarray(
    env,
    napi_float32_array,
    4,
    buffer,
    0,
    &result
);