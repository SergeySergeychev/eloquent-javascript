"use strict";
/*
// Function.prototype.call()

// The call() method calls the function with a given this value and arguments provided individually.

function Product(name, price) {
  this.name = name;
  this.price = price;

  if (price < 0) {
    throw RangeError(
      `Can't create product with this name - ${this.name}, the product has invalid price.`
    );
  }
}

function Food(name, price) {
  Product.call(this, name, price);
  this.category = "food";
}

Food.prototype = Object.create(Product.prototype);

function Toy(name, price) {
  Product.call(this, name, price);
  this.category = "toy";
}

Toy.prototype = Object.create(Product.prototype);
console.log(new Food("cheese", 5));
console.log(new Toy("robot", 40));

// Using call() to invoke an anonymous function

// Using anonymous function and use call to invoke it on every object in an array.

const animals = [
  { species: "Lion", name: "King" },
  { species: "Whale", name: "Fail" },
];

function assignPrintMethod(i) {
  this.print = function () {
    console.log(`#${i} ${this.species}: ${this.name}`);
  };
  this.print();
}

for (let i = 0; i < animals.length; i++) {
  assignPrintMethod.call(animals[i], i);
}

function greet() {
  const reply = [
    this.animal,
    "typically sleep between",
    this.sleepDuration,
  ].join(" ");
  console.log(reply);
}

const obj = {
  animals: "cats",
  sleepDuration: "12 and 16 hours",
};

greet.call(obj);

// Using call to invoke a function and without specifying the first argument.
const globProp = "Wisen";

function display() {
  console.log(`globProp value is ${this}`);
}

display.call(globProp);
*/

// Promisification

function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}

/*
loadScript("./javascriptInfoPromises/script.js", (error, script) => {
  if (error) {
    console.log(error);
  } else {
    console.log(script);
  }
});
*/

let loadScriptPromise = function (src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) reject(err);
      else resolve(script);
    });
  });
};

/*
loadScriptPromise("./javascriptInfoPromises/script.js").then(
  (result) => console.log(result),
  (error) => console.log(error)
);
*/

// Helper function to promisify callback function with one argument.

function promisify(f) {
  return function (...args) {
    // return a wrapper-function
    return new Promise((resolve, reject) => {
      function callback(err, result) {
        // custom callback f
        if (err) reject(err);
        else resolve(result);
      }
      args.push(callback);
      f.call(this, ...args);
    });
  };
}

let loadScriptPromise2 = promisify(loadScript);
/*
loadScriptPromise2("./javascriptInfoPromises/script.js").then(console.log);
*/

// Helper function to promisify fn with more than one argument.

function promisifyMany(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      function callback(err, ...results) {
        if (err) reject(err);
        else resolve(manyArgs ? results : results[0]);
      }
      args.push(callback);
      f.call(this, ...args);
    });
  };
}
