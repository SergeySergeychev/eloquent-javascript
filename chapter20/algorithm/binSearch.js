function binSearch(sortedArr, key) {
  for (let start = 0, end = sortedArr.length - 1, count = 0; start <= end; ) {
    let middle = Math.floor((start + end) / 2);
    ++count;
    console.log(sortedArr[middle]);
    if (sortedArr[middle] === key) {
      return { index: middle, operations: count };
    } else if (sortedArr[middle] < key) {
      start = middle + 1;
    } else if (sortedArr[middle] > key) {
      end = middle - 1;
    }
  }
  return -1;
}

console.log(binSearch([1, 2, 3, 4, 5, 6, 7, 8], 1));
