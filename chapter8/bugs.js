// "use strict";
function numberToString(n, base) {
  var result = "",
    sign = "";
  if (n < 0) {
    sign = "-";
    n = -n;
  }
  do {
    result = String(n % base) + result;
    n = Math.floor(n / base);
  } while (n > 0);
  return sign + result;
}

// console.log(numberToString(-13, 10));

function convertToString(value, base) {
  let result = "",
    sign = "";
  if (value < 0) {
    sign = "-";
    value = -value;
  }
  do {
    result = String(value % base) + result;
    value = Math.floor(value / base);
  } while (value > 0);
  {
    return sign + result;
  }
}

// console.log(convertToString(-13, 10));

function promptNumber(question) {
  let result = Number(prompt(question), "");
  if (isNaN(result)) return null;
  else return result;
}

function Vector(x, y) {
  this.x = x;
  this.y = y;
  this.plus = function (other) {
    return new Vector(this.x + other.x, this.y + other.y);
  };
}

function testVector() {
  let vec1 = new Vector(10, 10);
  let vec2 = new Vector(10, 10);
  let vec3 = vec1.plus(vec2);

  if (vec1.x !== 10) return false;
  if (vec1.y !== 10) return false;
  if (vec2.x !== 10) return false;
  if (vec2.y !== 10) return false;
  if (vec3.x !== 20) return false;
  if (vec3.y !== 20) return false;

  return "All is fine";
}

function promptDirection(question) {
  let result = prompt(question, "");
  if (result.toLocaleLowerCase() === "left") return "L";
  if (result.toLocaleLowerCase() === "right") return "R";
  throw new Error("Invalid direction " + result);
}

function look() {
  if (promptDirection("Where") === "L") {
    return "house";
  } else {
    return "two angry bears";
  }
}

// try {
//   console.log("You can see", look());
// } catch (error) {
//   console.log("Something went wrong, " + error);
// }

let context = null;

function withContext(newContext, body) {
  let oldContext = context;
  context = newContext;
  let result = body();
  context = oldContext;
  return result;
}

function lessThanTen() {
  if (context < 10) {
    throw new Error("Context is too small");
  }
}

function withContextFinally(newContext, body) {
  let oldContext = context;
  context = newContext;
  try {
    return body();
  } finally {
    context = oldContext;
  }
}

// try {
//   withContextFinally(9, lessThanTen);
// } catch (error) {
//   console.log("Ignore: " + error);
// }

// for (;;) {
//   try {
//     let dir = promptDirection("Where?");
//     console.log("Your direction is ", dir);
//     break;
//   } catch (error) {
//     console.log("Invalid direction. Try again.");
//   }
// }

function InputError(message) {
  this.message = message;
  this.stack = new Error().stack;
}

InputError.prototype = Object.create(Error.prototype);
InputError.prototype.name = "InputError";
let input = new InputError("Hello");

function promptDirectionInput(question) {
  let result = prompt(question, "");
  if (result.toLowerCase() === "left") return "L";
  if (result.toLowerCase() === "right") return "R";
  throw new InputError("Invalid direction: " + result);
}

// for (;;) {
//   try {
//     let dir = promptDirectionInput("Where");
//     console.log("Your direction is " + dir);
//     break;
//   } catch (error) {
//     if (error instanceof InputError) {
//       console.log("Invalid direction. Try again.");
//     } else {
//       throw e;
//     }
//   }
// }

function AssertionFailed(message) {
  this.message = message;
}

AssertionFailed.prototype = Object.create(Error.prototype);
AssertionFailed.prototype.name = "Assertion Failed";

function assert(test, message) {
  if (!test) {
    throw new AssertionFailed(message);
  }
}

function lastElement(array) {
  assert(array.length > 0, "Array is empty");
  return array[array.length - 1];
}

function canYouSpotTheProblem() {
  for (let counter = 0; counter < 10; counter++) {
    console.log("Happy happy");
    console.log(this);
  }
}

function Person(name) {
  this.name = name;
}

let ferdinand = new Person("Ferdinand");

class NewPerson {
  constructor(name) {
    this.name = name;
  }
}

let joe = new NewPerson("Joe");

function numberToStringOnceAgain(value, base = 10) {
  let result = "",
    sign = "";
  if (value < 0) {
    sign = "-";
    value = -value;
  }
  do {
    result = String(value % base) + result;
    value = Math.floor(value / base);
  } while (value > 0);
  {
    return sign + result;
  }
}

function promptNumberOA(value) {
  const n = Number(value);
  if (Number.isNaN(n)) return null;
  else return value;
}

function lastElementOA(array) {
  if (array.length === 0) {
    return { failed: true };
  } else {
    return { element: array[array.length - 1] };
  }
}

function promptDirectionOA(question) {
  let result = question;
  if (result.toLocaleLowerCase() === "left") {
    return "L";
  }
  if (result.toLocaleLowerCase() === "right") {
    return "R";
  }
  throw new Error("Invalid direction: " + result);
}

function lookOA(way) {
  if (promptDirectionOA(way) === "L") {
    return "a house";
  } else {
    return "two angry bears";
  }
}

// try {
//   console.log("You can see", lookOA("straight"));
// } catch (error) {
//   console.log("Something went wrong: " + error);
// }

const accounts = {
  a: 100,
  b: 0,
  c: 20,
};

function getAccount(accountName) {
  if (!accounts.hasOwnProperty(accountName)) {
    throw new Error(`No such account: ${accountName}`);
  }
  return accountName;
}

function transfer(from, to, amount) {
  if (accounts[from < amount]) return;
  accounts[from] -= amount;
  accounts[getAccount(to)] += amount;
}

function transferF(from, to, amount) {
  if (accounts[from] < amount) return;
  let progress = 0;
  try {
    accounts[from] -= amount;
    progress = 1;
    accounts[getAccount(to)] += amount;
    progress = 2;
  } finally {
    if (progress === 1) {
      accounts[from] += amount;
    }
  }
}

function firstElement(array) {
  if (array.length === 0) {
    throw new Error("firstElement called with []");
  }
  return array[0];
}
