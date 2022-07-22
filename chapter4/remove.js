function remove(array, element) {
  if (!array.includes(element)) return -1;
  return array
    .slice(0, array.indexOf(element))
    .concat(array.slice(array.indexOf(element) + 1));
}
