// Import the CommonJS Buffer module.
// `constants.MAX_LENGTH` and `kMaxLength` both represent
// the maximum size allowed for a single Buffer instance.
const { constants, kMaxLength } = require('node:buffer');

// Print the maximum Buffer size using `buffer.constants.MAX_LENGTH`.
console.log('buffer.constants.MAX_LENGTH:', constants.MAX_LENGTH);

// Print the same value using the `buffer.kMaxLength` alias.
console.log('buffer.kMaxLength:', kMaxLength);

// Convert the maximum Buffer size from bytes to GiB (Gibibytes)
// and display it with two decimal places.
console.log(`In GiB: ${(constants.MAX_LENGTH / 1024 ** 3).toFixed(2)} GiB`);


// ------------------------------------------------------------------
// ES Module (ESM) version
// ------------------------------------------------------------------

// Import the same values using ES Module syntax.
import { constants, kMaxLength } from 'node:buffer';

// Print the maximum Buffer size using `constants.MAX_LENGTH`.
console.log(constants.MAX_LENGTH);

// Print the same value using the `kMaxLength` alias.
console.log(kMaxLength);