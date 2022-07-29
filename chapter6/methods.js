function speak(line) {
  console.log(` The ${this.type} rabbit says "${line}"`);
}

let whiteRabbit = { type: "white", speak };
whiteRabbit.speak("I'm alive.");

let hungryRabbit = { type: "hungry", speak };
hungryRabbit.speak("I could us a carrot right now.");

speak.call(hungryRabbit, "Burp!");

// scope of thise in arrow fn.
function normalize() {
  console.log(this.coords.map((n) => n / this.length));
}

normalize.call({ coords: [0, 2, 3], length: 5 });
