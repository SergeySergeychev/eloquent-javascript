// page 107

function everything(numbers, test) {
  for (let number of numbers) {
    if (!test(number)) return false;
  }
  return true;
}

const greaterThanZero = everything([1, -2, 3], (n) => n > 0);

function everythingS(numbers, test) {
  return !numbers.some((number) => !test(number));
}

const greaterThanZeroS = everythingS([1, 2, 3], (n) => n > 0);

// solution by Marijn Haverbeke

function every(array, predicate) {
  for (let element of array) {
    if (!predicate(element)) return false;
  }
  return true;
}

function every2(array, predicate) {
  return !array.some((element) => !predicate(element));
}
