// page 38
for (let number = 1; number <= 100; number++) {
  let output = "";

  if (number % 3 === 0) {
    output = "Fizz";
  }

  if (number % 5 === 0 && number % 3 !== 0) {
    output = "Buzz";
  }

  if (number % 5 === 0 && number % 3 === 0) {
    output = "FizzBuzz";
  }
  console.log(output || number);
}

// Solution by Marijn Haverbeke

for (let n = 1; n < 100; n++) {
  let output = "";

  if (n % 3 == 0) output += "Fizz";
  if (n % 5 == 0) output += "Buzz";

  console.log(output || n);
}
