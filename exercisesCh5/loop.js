// page 107
/*
Write a higher-order function loop that provides something like a for loop
statement. It takes a value, a test function, an update function, and a body
function. Each iteration, it first runs the test function on the current loop value
and stops if that returns false. Then it calls the body function, giving it the
current value. Finally, it calls the update function to create a new value and
starts from the beginning.
When defining the function, you can use a regular loop to do the actual
looping.

*/

function loop(value, test, update, body) {
  let result = 0;
  for (let i = 0; test(i, value); i = update(i)) {
    result += body(i, value);
  }
  return result;
}

const sumOfNums = loop(
  [1, -2, -3, 4],
  (i, value) => i < value.length,
  (i) => i + 1,
  (i, value) => value[i]
);

// Solution by Marijn Haverbeke
function loopByMH(start, test, update, body) {
  for (let value = start; test(value); value = update(value)) {
    body(value);
  }
}

loopByMH(
  3,
  (n) => n > 0,
  (n) => n - 1,
  console.log
);
