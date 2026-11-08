// Declare the ArrayBuffer result
napi_value popResultSelector;

// Pointer to the ArrayBuffer memory
void* data;

// Create an ArrayBuffer with 5 bytes
napi_create_arraybuffer(env, 5, &data, &result);

// Cast the memory pointer to an unsigned char pointer
unsigned char* buffer = (unsigned char*)data;

// Fill the buffer with values from 1 to 5
for (int i = 0; i < 5; i++) {
    buffer[i] = i + 1;
}

// Return the created ArrayBuffer
return result;