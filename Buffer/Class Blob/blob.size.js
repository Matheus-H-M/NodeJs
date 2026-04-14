// Create a new Blob with two string parts
const blob = new Blob([
    'Olá, mundo!',              // First part of the content
    'Isso é um teste de blob.'  // Second part of the content
]);

// Log the total size of the Blob in bytes
// NOTE: .size returns the number of bytes stored in the Blob
console.log('Blob size:', blob.size, 'bytes');

// Create a string variable with some data
const data = 'Node.js Blob example';

// Create another Blob using the string above
const blob2 = new Blob([data]);

// Log the original content
console.log('Content:', data);

// Log the size of the second Blob in bytes
console.log('Size in bytes:', blob2.size);