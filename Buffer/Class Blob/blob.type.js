// Create a JavaScript object with some sample data
const data = { nome: "João", idade: 30 };

// Create a new Blob instance
// - First argument: an array containing the data to store (here we convert the object to a JSON string)
// - Second argument: an options object where we define the MIME type as JSON
const blob = new Blob(
    [JSON.stringify(data)],
    { type: 'application/json' }
);

// Log the Blob's content type to the console
// This will output: "application/json"
console.log(blob.type);