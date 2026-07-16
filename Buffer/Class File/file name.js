// Create a new File object.
const file = new File(
    // File contents.
    ["Hello, world!"],

    // Name of the file.
    "message.txt",

    // File options.
    {
        // MIME type of the file.
        type: "text/plain",
    }
);

// Print the file name.
console.log(file.name);

// Print the data type of the file name.
console.log(typeof file.name);