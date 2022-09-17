// Generators

function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
}

let generator = generateSequence();
let one = generator.next();
let two = generator.next();
let { value, done } = generator.next();
console.log(value, done);

let generator2 = generateSequence();
for (let value of generator2) {
  console.log(value);
}
let sequence = [0, ...generateSequence()];
// Using genrators for iterables
let range = {
  from: 1,
  to: 5,
  // for..of calls this method once in the beginning
  [Symbol.iterator]() {
    // ...it returns the iterator object:
    // onward, for..of wokks only with tha object, asking it for next values
    return {
      current: this.from,
      last: this.to,

      // next() is called on each iteration by the for...of loop
      next() {
        // it should return the value as an object {done:..., value:...}
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      },
    };
  },
};

for (let num of range) {
  console.log(num);
}

let str = "Hello";

let iterator = str[Symbol.iterator]();
while (true) {
  let result = iterator.next();
  if (result.done) break;
  console.log(result.value);
}

// Array.from

let arraylike = {
  0: "Hello",
  1: "World",
  length: 2,
};

let arr = Array.from(arraylike);
let arr1 = Array.from(range, (num) => num * num);

let str2 = "𝒳😂𩷶";

// splits str into array of characters

let chars = Array.from(str2);
let chars2 = str2.split("");

function slice(str, start, end) {
  return Array.from(str).slice(start, end).join("");
}

console.log(str2.slice(1, 3));

let range2 = {
  from: 1,
  to: 5,

  *[Symbol.iterator]() {
    // a shorthand for [Symbol.iterator]: function*()
    for (let value = this.from; value <= this.to; value++) {
      yield value;
    }
  },
};

for (let value of range2) {
  console.log(value);
}

// Generator composition

function* generateSequence2(start, end) {
  for (let i = start; i <= end; i++) yield i;
}

for (let value of generateSequence2(2, 10)) {
  console.log(value);
}

// Generator composition

function* generatePasswordCodes() {
  // 0-9
  yield* generateSequence2(48, 57);

  // A-Z
  // yield* generateSequence2(65, 90);

  // a...z
  // yield* generateSequence2(97, 122);
}

let str3 = "";

for (let code of generatePasswordCodes()) {
  str3 += String.fromCharCode(code);
}

// Inlined the code from nested generators

function* generatePasswordCodes2() {
  // 0-9
  for (let i = 48; i <= 58; i++) yield i;
  // A-Z
  for (let i = 65; i <= 90; i++) yield i;
  // a-z
  for (let i = 97; i <= 122; i++) yield i;
}

let str4 = "";
for (let code of generatePasswordCodes2()) {
  str4 += String.fromCharCode(code);
}

// "Yield" is a two-way street.
function* gen() {
  // Pass a question to the outer code and wait for an answer
  let result = yield "2 + 2 = ?";
  console.log(result);
}

let generatorTWS = gen();
console.log(generatorTWS);

let question = generatorTWS.next().value;
console.log(question);

generatorTWS.next(4);

function* gen2() {
  try {
    let result = yield "2+ 2;";
    console.log(
      "The execution does not reach here, because the exception is thrown above"
    );
  } catch (err) {
    console.log(err); // shows the err
  }
}

let generatorThrow = gen2();

let questionThrow = generatorThrow.next().value;

generatorThrow.throw(new Error("The answer is not found in my database"));

function* gen3() {
  yield 1;
  yield 2;
  yield 3;
}

const g = gen();

g.next();
g.return("foo");
console.log(g.next());

// Propogate the seed

let generatorSeed = pseudorandom(1);

function* pseudorandom(previous) {
  for (let i = previous; ; i = (i * 16807) % 2147483647) yield i;
}

function pseudorandom2(seed) {
  let value = seed;

  return function () {
    value = (value * 16807) % 2147483647;
    return value;
  };
}

let generatorSeed2 = pseudorandom2(1);
