// page 91
function range(start, end, step = +1) {
  const numberList = [];
  if (end < start && !(step > 0)) {
    for (let number = start; number >= end; number -= Math.abs(step)) {
      numberList.push(number);
    }
  } else if (end > start && !(step < 0)) {
    for (let number = start; number <= end; number += Math.abs(step)) {
      numberList.push(number);
    }
  }
  return numberList;
}

console.log(range(10, -1, -2));

function arrSum(arr) {
  let sumOfArr = 0;
  arr.forEach((number) => {
    sumOfArr += number;
  });
  return sumOfArr;
}

// Solution by Marijn Haverbeke
function rangeByMH(start, end, step = start < end ? 1 : -1) {
  let array = [];
  if (step > 0) {
    for (let i = start; i <= end; i += step) array.push(i);
  } else {
    for (let i = start; i >= end; i += step) array.push(i);
  }
  return array;
}

console.log(rangeByMH(10, -1, -2));
