const button = document.querySelector("button");
const buttons = document.querySelectorAll("button");

// addEventListener("click", () => {
//   console.log("You knocked?");
// });

// button.addEventListener("click", () => {
//   console.log("Button clicked");
// });

// button.onclick = () => {
//   console.log("Button clicked");
// };
// button.onclick = () => {
//   console.log("Handler works only once");
// };

// function once() {
//   console.log("Done.");
//   button.removeEventListener("click", once);
// }
// button.addEventListener("click", once);

// button.addEventListener("mousedown", (event) => {
//   if (event.button === 0) {
//     console.log("Left button");
//   } else if (event.button === 1) {
//     console.log("Middle button");
//   } else if (event.button === 2) {
//     console.log("Right button");
//   }
// });

// let para = document.querySelector("p");
// para.addEventListener("mousedown", () => {
//   console.log("Handler for paragraph");
// });
// button.addEventListener("mousedown", (event) => {
//   console.log("Handler for button");
//   if (event.button === 2) {
//     event.stopPropagation();
//   }
// });

// Array.from(buttons).map((button) =>
//   button.addEventListener("click", (event) => {
//     if ((event.target.nodeName = "BUTTON")) {
//       console.log("CLICKED: ", event.target.textContent);
//     }
//   })
// );

// let link = document.querySelector("a");
// link.addEventListener("click", (event) => {
//   console.log("Nope");
//   event.preventDefault();
// });

// const para = document.querySelector("p");
// addEventListener("keydown", (event) => {
//   if (event.key === "v") {
//     para.style.color = "violet";
//   }
// });
// addEventListener("keyup", (event) => {
//   if (event.key === "v") {
//     para.style.color = "";
//   }
// });

// addEventListener("keydown", (event) => {
//   console.log(event.key);
//   if (event.key == " " && event.ctrlKey) {
//     console.log("Continuing!");
//   }
// });

// addEventListener("click", (event) => {
//   let dot = document.createElement("div");
//   dot.className = "dot";
//   dot.style.left = event.pageX - 4 + "px";
//   dot.style.top = event.pageY - 4 + "px";
//   document.body.appendChild(dot);
// });

// let lastX; // Tracks the last observed mouse X position
// let bar = document.querySelector("div");

// bar.addEventListener("mousedown", (event) => {
//   if (event.button === 0) {
//     console.log(event.clientX);
//     lastX = event.clientX;
//     window.addEventListener("mousemove", moved);
//     event.preventDefault(); // Prevent selection
//   }
// });

// function moved(event) {
//   if (event.buttons === 0) {
//     window.removeEventListener("mousemove", moved);
//   } else {
//     let dist = event.clientX - lastX;
//     console.log(event.clientX, lastX);
//     let newWidth = Math.max(10, bar.offsetWidth + dist);
//     bar.style.width = newWidth + "px";
//     lastX = event.clientX;
//   }
// }

// Create some content

// document.body.appendChild(
//   document.createTextNode("supercalifragilisticexpialidocious ".repeat(1000))
// );

// let bar = document.querySelector("#progress");
// addEventListener("scroll", () => {
//   let max = document.body.scrollHeight - innerHeight;
//   bar.style.width = `${(pageYOffset / max) * 100}%`;
// });

// const help = document.querySelector("#help");
// const fields = document.querySelectorAll("input");

// for (let field of Array.from(fields)) {
//   field.addEventListener("focus", (event) => {
//     console.log(event.target);
//     let text = event.target.getAttribute("data-help");
//     help.textContent = text;
//   });
//   field.addEventListener("blur", (event) => {
//     help.textContent = "";
//   });
// }

// const squareWorker = new Worker("./squareworker.js");
// squareWorker.addEventListener("message", (event) => {
//   console.log("The worker responded: " + event.data);
// });
// squareWorker.postMessage(10);

// const bombTimer = setTimeout(() => {
//   console.log("BOOM");
// }, 500);

// if (Math.random() < 0.5) {
//   console.log("Defused.");
//   clearTimeout(bombTimer);
// }

// let ticks = 0;
// let clock = setInterval(() => {
//   console.log("tick", ticks++);
//   if (ticks === 10) {
//     clearInterval(clock);
//     console.log("stop.");
//   }
// }, 200);

// let textarea = document.querySelector("textarea");
// let timeout;

// textarea.addEventListener("input", () => {
//   clearTimeout(timeout);
//   timeout = setTimeout(() => console.log("Typed."), 500);
// });

// let scheduled = null;
// addEventListener("mousemove", (event) => {
//   event.preventDefault();
//   if (!scheduled) {
//     setTimeout(() => {
//       document.body.textContent = `Mouse at ${scheduled.pageX}, ${scheduled.pageY}`;
//       scheduled = null;
//     }, 250);
//   }
//   scheduled = event;
// });
