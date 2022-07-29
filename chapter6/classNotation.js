// page 114
class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}

let killerRabbit = new Rabbit("killer");
let blackRabbit = new Rabbit("black");

// class expression
let object = new (class {
  getWord() {
    return "hello";
  }
})();

Rabbit.prototype.teeth = "small";
