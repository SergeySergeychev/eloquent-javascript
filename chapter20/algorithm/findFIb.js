// finding Fibonacci numbers with memoization.

function fibonacci(n, pastResult) {
  let memo = pastResult || [1, 1];
  let i = memo.length;
  // Output result
  if (i > n) {
    console.log("looking up value");
    return {
      // return 2 values
      pastResult: memo,
      result: memo[n - 1],
    };
  }
  for (; i < n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }
  return {
    pastResult: memo,
    result: memo[n - 1],
  };
}

const fib5 = fibonacci(5);
const fib4 = fibonacci(4, fib5.pastResult);
