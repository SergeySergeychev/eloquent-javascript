function computeChange(coins, amount) {
  const coinCount = [];
  let i = 0;
  let creminder = amount;
  let ccoin;

  while (i < coins.length) {
    coinCount[i] = 0;
    while (coins[i] <= creminder) {
      creminder = creminder - coins[i];
      ccoin = coinCount[i];
      ccoin += 1;
      coinCount[i] = ccoin;
    }
    i++;
  }
  return coinCount;
}

console.log(computeChange([50, 25, 10, 5, 1], 137));
console.log(computeChange2([50, 25, 10, 5, 1], 137));

function computeChange2(coins, amount) {
  const result = [];
  for (let i = 0; i < coins.length; i++) {
    let change = Math.floor(amount / coins[i]);
    amount -= coins[i] * change;

    result.push(change);
  }
  return result;
}
