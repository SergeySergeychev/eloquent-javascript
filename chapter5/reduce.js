// page 101

function reduce(array, combine, start) {
  let current = start;
  for (let element of array) {
    current = combine(current, element);
  }
  return current;
}

const sumOfNum = reduce([1, 2, 3, 4], (a, b) => a + b, 0);

function characterCount(script) {
  return script.ranges.reduce((count, [from, to]) => {
    return count + (to - from);
  }, 0);
}

const mostCharacterScript = SCRIPTS.reduce((a, b) => {
  return characterCount(a) < characterCount(b) ? b : a;
});

let biggest = null;

for (let script of SCRIPTS) {
  if (biggest == null || characterCount(biggest) < characterCount(script)) {
    biggest = script;
  }
}

function average(array) {
  return array.reduce((a, b) => a + b) / array.length;
}

const averageAgeOfLivingScripts = Math.round(
  average(
    SCRIPTS.filter((script) => script.living).map((script) => script.year)
  )
);

const averageAgeOfDeadScripts = Math.round(
  average(
    SCRIPTS.filter((script) => !script.living).map((script) => script.year)
  )
);

let total = 0,
  count = 0;
for (let script of SCRIPTS) {
  if (script.living) {
    total += script.year;
    count++;
  }
}
