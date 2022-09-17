// create a script tag and append it to the page
// this causes the script with given src to start load and run when complete
function loadScript(src) {
  let script = document.createElement("script");
  script.src = src;
  console.log(script);
  document.head.append(script);
}

// load and execute the script at the given path
/*
loadScript("./javascriptInfoPromises/script.js");
*/
// the code below loadScript
// doesn't wait for the script loading to finish
/*
newFunction(); // no such fn
*/

function loadScriptCB(src, callback, n) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(script);
  document.head.append(script);
}
/*
loadScriptCB("./javascriptInfoPromises/script.js", function (script) {
  //  the callback runs after the script is loaded
  newFunction();
});

loadScriptCB(
  "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js",
  (script) => {
    console.log(`Cool, the script ${script.src} is loaded`);
    console.log(_); // _ is a function declared in the loaded script
  }
);
*/
// Callback in Callback
/*
loadScriptCB("./javascriptInfoPromises/script.js", function (script) {
  console.log(`Cool , the ${script.src} is loaded`);
  loadScriptCB("./javascriptInfoPromises/script2.js", function (script) {
    console.log(`Cool , the second ${script.src} is loaded`);
  });
});
*/
function loadScriptImproved(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

/*
loadScriptImproved(
  "./javascriptInfoPromises/script.js",
  function (error, script) {
    if (error) {
      console.log(error);
    } else {
      console.log(script);
    }
  }
);
*/
