/*
let promise = new Promise(function (resolve, reject) {
  // the function is executed automatically when the promise is constructed

  // after 1 second signal that the job is done with the result "done"
  setTimeout(() => resolve("done"), 1000);
  // resolve("done");

  // reject(new Error("ignored"));
  // setTimeout(() => resolve("ignored too"));
});
promise.then(
  (result) => console.log(result), // show " done!" after 1 second
  (error) => console.log(error) // doens't run
);
*/
/*
let promiseFail = new Promise(function (resolve, reject) {
  // after 1 second signal that the job is finished with an error.
  setTimeout(() => reject(new Error("Woops!")), 1000);
});

promiseFail.then(
  null, /// We are interested only in rejected result
  // (result) => console.log(result), // doesn't run
  (error) => console.log(error) // shows "Error: Woops!" after 1 second
);

promiseFail.catch(console.log);
*/
/*
// Immidiately calling resolve / reject
let promiseImmed = new Promise((resolve, reject) => {
  // not takig our time to do the job
  resolve(123); // immediately give the result: 123
});
promiseImmed.then(console.log);
*/
/*
// Finally to perform "general" finalizing procedures
let promiseFinally = new Promise((resolve, reject) => {
  setTimeout(() => resolve("value"), 2000);
})
  .finally(() => {
    console.log("Promise ready"); // triggers first
  })
  .then((result) => console.log(result));

let promiseFinallyError = new Promise((resolve, reject) => {
  throw new Error("error");
  // setTimeout(() => reject(new Error("Error")), 3000);
})
  .finally(() => {
    console.log("Promise ready"); // triggers first
  })
  .catch((error) => console.log(error));
*/

// Using Promises to write loadScript
function loadScript(src) {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));

    document.head.append(script);
  });
}

let script = loadScript("./javascriptInfoPromises/script.js");

script.then(console.log);

let script2 = loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"
);

script2.then(
  (script) => console.log("Is loaded"),
  (error) => console.log(`Error: ${error.message}`)
);

script2.then((script) => console.log("Another handler"));

function delay(ms) {
  return new Promise((resolve, reject) => setTimeout(resolve, ms));
}

delay(3000).then(() => console.log("runs after 3 seconds"));
