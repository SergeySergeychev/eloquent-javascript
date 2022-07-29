// 116
let ages = {
  Boris: 39,
  Liang: 22,
  Julia: 62,
};

let agesNoPrototype = Object.assign(Object.create(null), ages);

console.log(`Julia is ${agesNoPrototype["Julia"]}`);
console.log("Is Liang's age known?", "Liang" in agesNoPrototype);
console.log("Is toString's age know?", "toString" in agesNoPrototype);

let agesM = new Map();
agesM.set("Boris", 39);
agesM.set("Liang", 22);
agesM.set("Julia", 62);

console.log(`Julia is ${agesM.get("Julia")}`);
console.log("Is Liang's age known?", agesM.has("Liang"));
console.log("Is toString's age know?", agesM.has("toString"));

console.log(ages.hasOwnProperty("Boris"));
