try {
  setTimeout(() => {
    // throw new Error("Woosh");
  }, 20);
} catch (_) {
  console.log("Caught!");
}
let start = Date.now();
setTimeout(() => {
  console.log("Timeout ran at", Date.now() - start);
});

while (Date.now() < start + 77) {}
console.log("Wasted time until", Date.now() - start);
