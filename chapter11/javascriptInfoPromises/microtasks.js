"use strict";
/*
let promise = Promise.resolve();
promise.then(() => console.log("promise done!"));

console.log("code finished");

// Code executes synchronously

Promise.resolve()
  .then((result) => console.log("result nr1"))
  .then((result) => console.log("result nr2"));
*/

// Unhandled rejection

let promise2 = Promise.reject(new Error("Promise failed!"));

window.addEventListener("unhandledrejection", (event) =>
  console.log(event.reason)
);
// doesn't run: error handler
// promise2.catch((err) => console.log("caught"));

// Error handler will handle the error and after error will be caught by catch.
setTimeout(() => promise2.catch((err) => console.log("caught")), 1000);
