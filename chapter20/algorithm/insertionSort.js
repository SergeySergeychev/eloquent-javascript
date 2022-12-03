function insetionSort(arr) {
  const comparator = (a, b) => a - b;
  const swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };
  let count = 0;
  for (let i = 1; i < arr.length; i++) {
    let current = i;

    while (
      arr[current - 1] !== undefined &&
      comparator(arr[current], arr[current - 1]) < 0
    ) {
      count++;
      swap(arr, current - 1, current);
      current--;
    }
  }
  return { sorted: arr, operations: count };
}
console.log(insetionSort([8, 7, 6, 5, 4, 3, 2, 1]));
