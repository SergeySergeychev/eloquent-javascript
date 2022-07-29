// page 111
let empty = {};
console.log(empty.toString);
console.log(empty.toString());
console.log(Object.getPrototypeOf({}) === Object.prototype);
console.log(Object.getPrototypeOf(Object.prototype));
console.log(Object.getPrototypeOf(Math.max) === Function.prototype);
console.log(Object.getPrototypeOf([]) === Array.prototype);
