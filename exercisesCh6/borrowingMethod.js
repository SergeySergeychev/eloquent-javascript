function Family(mother, father, son) {
  this.mother = mother;
  this.father = father;
  this.son = son;
}
const hasOwnProperty = Symbol("hasOwnProperty");
Family.prototype[hasOwnProperty] = () => "Symbol Property";

const myFamily = new Family("Renate", "Sergej", "Maksim");

console.log(myFamily[hasOwnProperty]());
console.log(myFamily.hasOwnProperty());

// Solution by Marijn Haverbeke
let map = { one: true, two: true, hasOwnProperty: true };
console.log(Object.hasOwnProperty.call(map, "hasOwnProperty"));
