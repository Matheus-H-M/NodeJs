// Destructure methods from Buffer prototype
const { toString, write, slice } = Buffer.prototype;

// Create a Uint8Array with 10 bytes
const uint8array = new Uint8Array(10);

// Write the string "hello" into the Uint8Array
// write.call allows us to use Buffer's write method on Uint8Array
const bytesWritten = write.call(uint8array, 'hello', 0, 5, 'utf8');
console.log('Bytes written:', bytesWritten);

// Log the raw Uint8Array contents (byte values)
console.log('Uint8Array:', uint8array);

// Convert the Uint8Array content back to string
// using Buffer's toString method
const text = toString.call(uint8array, 'utf8', 0, bytesWritten);
console.log('Converted text:', text);

// Use Buffer's slice method on Uint8Array
// to extract a portion of the array
const sliced = slice.call(uint8array, 0, 5);
console.log('Slice:', sliced);