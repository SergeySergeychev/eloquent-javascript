// page 100

function map(array, transform) {
  let mapped = [];
  for (let element of array) {
    mapped.push(transform(element));
  }
  return mapped;
}

const rtlScripts = map(
  filter(SCRIPTS, (s) => s.direction === "rtl"),
  (s) => s.name
);
