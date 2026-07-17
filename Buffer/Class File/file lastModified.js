// Create a new File object.
const file = new File(
    // The file contents as an array of data chunks.
    ["Hello, world!"],

    // The file name.
    "example.txt",

    // File metadata.
    {
        // The MIME type of the file.
        type: "text/plain",

        // The last modified time as a Unix timestamp (milliseconds).
        lastModified: Date.now()
    }
);

// Print the file name.
console.log("Name:", file.name);

// Print the file MIME type.
console.log("Type:", file.type);

// Print the file size in bytes.
console.log("Size:", file.size, "bytes");

// Print the last modified timestamp (milliseconds since January 1, 1970 UTC).
console.log("lastModified:", file.lastModified);

// Convert the timestamp to a human-readable date and print it.
console.log("Date:", new Date(file.lastModified).toLocaleString());