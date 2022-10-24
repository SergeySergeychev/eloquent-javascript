// Solution
const balloon = document.querySelector("p");
let balloonSize = 10;
function changeSizeExplodeBalloon(event) {
  event.preventDefault();

  //Explode the balloon if size is bigger than 100px
  if (balloonSize > 100) {
    console.log("BALLOON EXPLODED");
    removeEventListener("keydown", changeSizeExplodeBalloon);
    balloon.innerHTML = "💥";
  }
  // Inflate the balloon
  if (event.key === "ArrowUp") {
    balloonSize = balloonSize * 1.1;
    balloon.style.fontSize = balloonSize + "px";
  }
  // Deflate the balloon
  if (event.key === "ArrowDown") {
    balloonSize = balloonSize * 0.9;
    balloon.style.fontSize = balloonSize + "px";
  }
}

addEventListener("keydown", changeSizeExplodeBalloon);

// Solution by Marijn Haverbeke

// let p = document.querySelector("p");
// let size;

// function setSize(newSize) {
//   size = newSize;
//   p.style.fontSize = size + "px";
// }

// setSize(20);

// function handleArrow(event) {
//   if (event.key === "ArrowUp") {
//     if (size > 70) {
//       p.textContent = "💥";
//       document.body.removeEventListener("keydown", handleArrow);
//     } else {
//       setSize(size * 1.1);
//       event.preventDefault();
//     }
//   } else if (event.key === "ArrowDown") {
//     setSize(size * 0.9);
//     event.preventDefault();
//   }
// }

// document.body.addEventListener("keydown", handleArrow);
