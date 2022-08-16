let number = /^[+-]?(\d+)?(\d\.?|\.?\d+)?(e[+-]?\d+)?$/i;
// solution by Marijn Haverbeke
let numberMH = /^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$/;
[
  //Tests

  "1",
  "11.1e+123",
  "-1",
  "+15",
  "1.55",
  ".5",
  "5.",
  "1.3e2",
  "1E-4",
  "1e+12",
].forEach((n) => {
  if (!numberMH.test(n)) {
    console.log(`Didn't find  matched number: ${n}`);
  }
});

["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5", ".", "+-"].forEach((n) => {
  if (numberMH.test(n)) {
    console.log(`Unexpected matched number: ${n}`);
  }
});
