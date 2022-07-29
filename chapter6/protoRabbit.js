// page 112
let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  },
};

let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = "killer";

function makeRabbit(type) {
  let rabbit = Object.create(protoRabbit);
  rabbit.type = type;
  return rabbit;
}

function Rabbit(type) {
  this.type = type;
}

Rabbit.prototype.speak = function (line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
};

let weirdRabbit = new Rabbit("weird");

Rabbit.prototype.toString = function () {
  return `a ${this.type} rabbit`;
};

let sym = Symbol("name");
Rabbit.prototype[sym] = 55;
console.log(weirdRabbit[sym]);
