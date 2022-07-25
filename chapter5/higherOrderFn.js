function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}

function greaterThan(n) {
  return (m) => m > n;
}

function noisy(f) {
  return (...args) => {
    console.log("calling with", args);
    let result = f(...args);
    console.log("called with args", "returned", result);
    return result;
  };
}

function unless(test, then) {
  if (!test) then();
}

repeat(3, (n) => {
  unless(n % 2 === 1, () => {
    console.log(n, "is even");
  });
});

repeat(3, (n) => {
  unless(n % 2 === 0, () => {
    console.log(n, "is odd");
  });
});
