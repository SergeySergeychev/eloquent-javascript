// page 91
// Reverse array and don't produce mutation.
function reverseArray(array) {
  let newArr = [];
  array.forEach((_, index, arr) => {
    newArr.push(arr[arr.length - (1 + index)]);
  });
  return newArr;
}

// Reverse and mutate original array.
let originalArrForMe = ["A", 1, 2, 3, 4];
let originalArrForMH = ["A", 1, 2, 3, 4];
function reverseArrayInPlace(array) {
  for (let i = 0, steps = Math.floor(array.length / 2); i < steps; i++) {
    swapElemets(array, i);
  }
  return array;
}

function swapElemets(array, i) {
  let lastEl = array[array.length - (1 + i)];
  array[array.length - (1 + i)] = array[i];
  array[i] = lastEl;
}

// Solution by Marijn Haverbeke

function reverseArrayByMH(array) {
  let output = [];
  for (let i = array.length - 1; i >= 0; i--) {
    output.push(array[i]);
  }
  return output;
}

function reverseArrayInPlaceByMH(array) {
  for (let i = 0; i < Math.floor(array.length / 2); i++) {
    let old = array[i];
    array[i] = array[array.length - 1 - i];
    array[array.length - 1 - i] = old;
  }
  return array;
}

console.log(reverseArrayInPlaceByMH(originalArrForMH));
console.log(originalArrForMH);
console.log(reverseArrayInPlace(originalArrForMe));
console.log(originalArrForMe);
