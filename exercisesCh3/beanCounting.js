// page 68
function countBs1(string) {
  return countChar1(string, "B");
}

function countChar1(string, char) {
  const counted = string.split("").filter((el) => el === char).length;
  return counted;
}
console.log(countBs1("B B B B abscdef"));
console.log(countChar1("B B B B abscdef", "B"));

// Solution by Marijn Haverbeke
function countBs2(string) {
  return countChar2(string, "B");
}
function countChar2(string, ch) {
  let counted = 0;
  for (let i = 0; i < string.length; i++) {
    if (string[i] === ch) {
      counted++;
    }
  }
  return counted;
}
console.log(countBs2("B B B B abscdef"));
console.log(countChar2("B B B B abscdef", "B"));
