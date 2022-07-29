// page 123
let varyingSize = {
  get size() {
    return Math.floor(Math.random() * 100);
  },
};

class Temperature {
  constructor(celsius) {
    this.celsius = celsius;
  }
  get fahrenheit() {
    return this.celsius * 1.8 + 32;
  }

  set fahrenheit(value) {
    this.celsius = (value - 32) / 1.8;
  }

  static fromFahrenheit(value) {
    return new Temperature((value - 32) / 1.8);
  }
}

let temp = new Temperature(22);
console.log(temp.fahrenheit);
temp.fahrenheit = 33.8;
console.log(Math.round(temp.celsius));

const oneCelsius = Temperature.fromFahrenheit(33.8);
