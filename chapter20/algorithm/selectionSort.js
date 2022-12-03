function selectionSort(arr) {
  const comparator = (a, b) => a - b;
  const swap = (arr, i, j) => ([arr[i], arr[j]] = [arr[j], arr[i]]);
  let count = 0;
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      count++;
      if (comparator(arr[min], arr[j]) > 0) {
        console.log(arr[min]);
        min = j;
      }
    }
    if (min !== i) swap(arr, i, min);
  }
  return { sorted: arr, operations: count };
}

console.log(selectionSort([1, 2, 3, 4, 5, 6, 7, 8]));
