// page 68

function isEven1(n) {
  if (n < 0) {
    n *= -1;
  }
  if (n === 0) {
    return true;
  } else if (n === 1) {
    return false;
  } else {
    return isEven1(n - 2);
  }
}

// Solution by Marijn Haverbeke
function isEven2(n) {
  if (n === 0) return true;
  else if (n === 1) return false;
  else if (n < 0) return isEven2(-n);
  else return isEven2(n - 2);
}

console.log(isEven1(-3));
console.log(isEven2(-3));
