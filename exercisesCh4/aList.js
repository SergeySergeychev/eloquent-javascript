// page 92

let list1 = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null,
    },
  },
};

let list2 = {
  value: 1,
  rest: {
    value: 2,
    rest: {
      value: 3,
      rest: null,
    },
  },
};

function arrayToList(array) {
  let list = null;
  for (let i = 0; i < array.length; i++) {
    list = { value: array[array.length - (1 + i)], rest: list };
  }
  return list;
}
function prepend(element, list) {
  return { value: element, rest: list };
}

function nth(index, list) {
  let array = listToArrayByMH(list);
  if (array[index]) return array[index];
  else return undefined;
}

function deepEqual(value1, value2) {
  if (typeof value1 === "object" && typeof value2 === "object") {
    return JSON.stringify(value1) === JSON.stringify(value2);
  } else {
    return value1 === value2;
  }
}
// Solution by Marijn Haverbeke
function arrayToListByMH(array) {
  let list = null;
  for (let i = array.length - 1; i >= 0; i--) {
    list = { value: array[i], rest: list };
  }
  return list;
}

function listToArrayByMH(list) {
  let array = [];
  for (let node = list; node; node = node.rest) {
    array.push(node.value);
  }
  return array;
}

function nthByMH(list, n) {
  if (!list) return undefined;
  else if (n === 0) return list.value;
  else return nthByMH(list.rest, n - 1);
}

function deepEqualByMH(a, b) {
  if (a === b) return true;
  if (a == null || typeof a != "object" || b == null || typeof b != "object")
    return false;
  let keysA = Object.keys(a),
    keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;

  for (let key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
  }
  return true;
}
