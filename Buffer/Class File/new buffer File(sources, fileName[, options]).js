// Import the File class from Node.js's built-in buffer module.
const { File } = require("node:buffer");

// Create a new File object in memory.
const file = new File(
    [
        // Add a string as the first part of the file.
        "Hello, world!\n",

        // Add a Buffer containing text as the second part.
        Buffer.from("This text came from a Buffer.\n"),

        // Add a Uint8Array containing the ASCII values for "ABC".
        new Uint8Array([65, 66, 67])
    ],

    // Set the file name.
    "example.txt",

    // File options.
    {
        // Specify the MIME type of the file.
        type: "text/plain",

        // Convert line endings to the current operating system's format.
        endings: "native",

        // Set the last modified timestamp.
        lastModified: Date.now()
    }
);

// Display the file name.
console.log("Name:", file.name);

// Display the MIME type.
console.log("Type:", file.type);

// Display the file size in bytes.
console.log("Size:", file.size);

// Display the last modified date.
console.log("Last Modified:", new Date(file.lastModified));

// Read and display the file contents.
(async () => {
    // Convert the file contents into a string.
    const text = await file.text();

    // Print the file contents.
    console.log("\nContents:");
    console.log(text);
})();