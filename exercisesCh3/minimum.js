// page 55
function min1(number1, number2) {
  const smallestNumber = number1 < number2 ? number1 : number2;
  return smallestNumber;
}

// Solution by Marijn Haverbeke
function min2(a, b) {
  if (a < b) return a;
  else return b;
}

console.log(min1(3, 2));
console.log(min2(3, 2));
