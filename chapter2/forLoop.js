// page 32
for (let number = 0; number <= 12; number += 2) {
  console.log(number);
}

// page 33

let result = 1;
for (let counter = 0; counter < 10; counter++) {
  result *= 2;
}
console.log(result);

// page 33 "Breaking out of a loop"
for (let current = 20; ; current++) {
  if (current % 7 === 0) {
    console.log(current);
    break;
  }
}
