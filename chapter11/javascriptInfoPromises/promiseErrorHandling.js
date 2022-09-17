// Implicit try ... catch

new Promise((resolve, reject) => {
  throw new Error("Whoops!");
}).catch(console.log);

new Promise((resolve, reject) => {
  reject(new Error("Whoops!"));
}).catch(console.log);

new Promise((resolve, reject) => {
  resolve("ok");
})
  .then((result) => {
    blabla();
  })
  .catch(console.log);

// Execution: catch -> then
new Promise((resolve, reject) => {
  throw new Error("Whoops!");
})
  .catch((error) => {
    console.log("The error is handled, continue normally");
  })
  .then((result) => console.log("Next succesful handler runs"));

// Execution: catch -> catch

new Promise((resolve, reject) => {
  throw new Error("Whoops!");
})
  .catch((error) => {
    if (error instanceof URIError) {
      // handle it
    } else {
      console.log("Can't handle such error");
      throw error; // jumps to another catch
    }
  })
  .then((result) => {
    // doesn't run here
  })
  .catch((error) => {
    console.log(`Then unknown error has occured: ${error}`);
    return "I'm ok!";
    // don't return anything => execution goes the normal way
  })
  .then(console.log);

// Unhandled rejections

window.addEventListener("unhandledrejection", (event) => {
  console.log(event.promise);
  console.log(event.reason);
});

new Promise(() => {
  throw new Error("Whoops!");
}); // no catch to handle the error

new Promise(function (resolve, reject) {
  setTimeout(() => {
    throw new Error("Whoops!");
  }, 1000);
}).catch(alert); // Uncaught error, because setTimeout will triggers later.
