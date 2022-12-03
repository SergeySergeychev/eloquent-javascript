function bblSort(arr) {
  let nums = [...arr];
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    // // After first circle latst number is greatest.
    for (let j = 0; j < nums.length - 1 - i; j++) {
      // If current num is > next num swap.
      count++;
      if (nums[j] > nums[j + 1]) swap(nums, j);
    }
  }
  return { sorted: nums, operations: count };
}

function swap(arr, index) {
  let temp = arr[index];
  arr[index] = arr[index + 1];
  arr[index + 1] = temp;
}
const destSwap = (arr, i, j) => ([arr[i], arr[j]] = [arr[j], arr[i]]);

console.log(bblSort([1, 2, 3, 4, 5, 6, 7, 8]));
console.log(bblSort2([1, 2, 3, 4, 5, 6, 7, 8]));
console.log(bblSort3([1, 2, 3, 4, 5, 6, 7, 8]));

function bblSort2(arr) {
  let nums = [...arr];
  let isSwapped = false;
  let count = 0;

  for (let i = 0; i < nums.length; i++) {
    isSwapped = false;
    for (let j = 0; j < nums.length - i - 1; j++) {
      count++;
      if (nums[j] > nums[j + 1]) {
        swap(nums, j);
        isSwapped = true;
      }
    }
    if (!isSwapped) {
      break;
    }
  }
  return { sorted: nums, operations: count };
}

function bblSort3(arr) {
  const comparator = (a, b) => a - b;
  const swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };
  let count = 0;
  for (let j = arr.length - 1; j > 0; j--) {
    for (let i = 0; i < j; i++) {
      count++;
      if (comparator(arr[i], arr[i + 1]) > 0) {
        swap(arr, i, i + 1);
      }
    }
  }
  return { sorted: arr, operations: count };
}
