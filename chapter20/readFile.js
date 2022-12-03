// const { writeFile, readFile } = require("fs");

// readFile("file.txt", (error, buffer) => {
//   if (error) throw error;
//   console.log(
//     "The file contained",
//     buffer.length,
//     "bytes.",
//     "The first byte is:",
//     buffer[0]
//   );
// });
// readFile("graffiti.txt", "UTF8", (error, text) => {
//   if (error) throw error;
//   console.log("This file contains :" + text);
// });

// writeFile("graffiti.txt", "Node was here", (err) => {
//   if (err) console.log(`Failed to write file: ${err}`);
//   else console.log(`File written`);
// });

// Using promises to call methods

const { readFile } = require("node:fs/promises");
readFile("file.txt", "utf8").then((text) =>
  console.log("The file contains: ", text)
);

// Synchronous fileReader
const { readFileSync } = require("fs");
console.log("The file contains: ", readFileSync("file.txt", "utf8"));
