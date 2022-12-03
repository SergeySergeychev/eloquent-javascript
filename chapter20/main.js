const { reverse } = require("./reverse");
// Index 2 holds the frist actual command line argument
let argument = process.argv[2];
console.log(process.argv);
console.log(reverse(argument));
