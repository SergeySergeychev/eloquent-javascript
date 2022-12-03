let { readFile } = require("fs");
readFile("file.txt", "utf8", (error, text) => {
  if (error) throw error;
  console.log("This file contains: ", text);
});
