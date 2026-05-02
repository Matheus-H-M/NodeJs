// Import React and the useState hook to manage component state
import React, { useState } from "react";

// Import Buffer from the buffer package (used to calculate byte length)
import { Buffer } from "buffer";

// Define and export the functional React component
export default function ByteLengthDemo() {
  // Create a state variable 'text' with an initial value
  // 'setText' is used to update the text when the user types
  const [text, setText] = useState("% + % = %");

  // Get the number of characters in the string
  const charLength = text.length;

  // Get the number of bytes of the string using UTF-8 encoding
  const byteLength = Buffer.byteLength(text, "utf8");

  // Return the UI (JSX)
  return (
    // Main container with inline styling
    <div style={{ fontFamily: "Arial", padding: "20px" }}>

      {/* Title */}
      <h2>Buffer.byteLength Demo</h2>

      {/* Text area where user can type */}
      <textarea
        rows={4}
        cols={40}
        value={text} // Controlled input linked to state
        onChange={(e) => setText(e.target.value)} // Update state on change
      />

      {/* Display the current text */}
      <p>
        <strong>Text:</strong> {text}
      </p>

      {/* Display character length */}
      <p>
        <strong>Characters:</strong> {charLength}
      </p>

      {/* Display byte length */}
      <p>
        <strong>Bytes (UTF-8):</strong> {byteLength}
      </p>

      {/* Explanation note */}
      <p style={{ color: "gray" }}>
        Note: The number of bytes can be larger than the number of characters due to UTF-8 encoding.
      </p>
    </div>
  );
}