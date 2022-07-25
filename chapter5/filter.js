// page 99
function filter(array, test) {
  let passed = [];
  for (let element of array) {
    if (test(element)) {
      passed.push(element);
    }
  }
  return passed;
}

const livingScripts = filter(SCRIPTS, (script) => script.living);
