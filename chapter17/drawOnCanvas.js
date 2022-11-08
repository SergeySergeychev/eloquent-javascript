// const cx = document.querySelector("canvas").getContext("2d");

/*
// First example working with arcTo method.
// Tangential lines
ctx.beginPath();
ctx.strokeStryle = "grey";
ctx.moveTo(200, 20);
ctx.lineTo(200, 130);
ctx.lineTo(50, 20);
ctx.stroke();

// Arc
ctx.beginPath();
ctx.strokeStyle = "black";
ctx.lineWidth = 5;
ctx.moveTo(200, 20);
ctx.arcTo(200, 130, 50, 20, 40);
ctx.stroke();

// Start Point
ctx.beginPath();
ctx.fillStyle = "blue";
ctx.arc(200, 20, 5, 0, 2 * Math.PI);
ctx.fill();

// Control Points
ctx.beginPath();
ctx.fillStyle = "red";
ctx.arc(200, 130, 5, 0, 2 * Math.PI);
ctx.arc(50, 20, 5, 0, 2 * Math.PI);
ctx.fill();
*/

/*
// Creating a rounded corner
const p0 = { x: 230, y: 20 };
const p1 = { x: 90, y: 130 };
const p2 = { x: 20, y: 20 };

const labelPoint = (p) => {
  const offset = 15;
  ctx.fillText(`(${p.x},${p.y})`, p.x + offset, p.y + offset);
};

ctx.beginPath();
ctx.moveTo(p0.x, p0.y);
ctx.arcTo(p1.x, p1.y, p2.x, p2.y, 50);
ctx.lineTo(p2.x, p2.y);

labelPoint(p0);
labelPoint(p1);
labelPoint(p2);
ctx.stroke();
*/

/*
let circle = document.querySelector("circle");
circle.setAttribute("fill", "cyan");
*/

/*
let canvas = document.querySelector("canvas");
let cxt = canvas.getContext("2d");
cxt.fillStyle = "red";
cxt.fillRect(10, 10, 100, 50);

cxt.strokeStyle = "blue";
cxt.strokeRect(120, 10, 100, 50);
cxt.lineWidth = 5;
cxt.strokeRect(230, 10, 100, 50);
*/

// Paths
/*
cx.beginPath();
for (let y = 10; y < 100; y += 10) {
  cx.moveTo(10, y);
  cx.lineTo(90, y);
}
cx.stroke();
*/

/*
cx.beginPath();
cx.moveTo(50, 10);
cx.lineTo(10, 70);
cx.lineTo(90, 70);
cx.fill();
*/

/*
// Create path
let region = new Path2D();
region.moveTo(30, 90);
region.lineTo(110, 20);
region.lineTo(240, 130);
region.lineTo(60, 130);
region.lineTo(190, 20);
region.lineTo(270, 90);
region.closePath();

// Fill path
cx.fillStyle = "green";
cx.fill(region, "evenodd");

cx.beginPath();
cx.fillStyle = "black";
cx.arc(30, 90, 2, 0, 2 * Math.PI);
cx.fillText("1", 30 - 10, 90 - 10);
cx.arc(110, 20, 2, 0, 2 * Math.PI);
cx.arc(240, 130, 2, 0, 2 * Math.PI);
cx.arc(60, 130, 2, 0, 2 * Math.PI);
cx.arc(190, 20, 2, 0, 2 * Math.PI);
cx.arc(270, 90, 2, 0, 2 * Math.PI);
cx.closePath();
cx.stroke();
*/

/*
cx.beginPath();
cx.moveTo(10, 90);
// CONTROL = (60,10) GOAL = (90,90)
cx.quadraticCurveTo(60, 10, 90, 90);
cx.lineTo(60, 10);
cx.closePath();
cx.stroke();
*/

/*
cx.beginPath();
cx.moveTo(10, 90);
// control1 = (10,10) control2 = (90,10) goal = (90,90)
cx.bezierCurveTo(10, 10, 90, 10, 90, 90);
cx.lineTo(90, 10);
cx.lineTo(10, 10);
cx.closePath();
cx.stroke();
*/

/*
cx.beginPath();
// center = (50,50) radius = 40, angle = 0 to 7
cx.lineWidth = 1;
cx.arc(50, 50, 40, 0, Math.PI);
cx.stroke();
cx.beginPath();
cx.arc(150, 50, 40, 0, 2 * Math.PI);
cx.stroke();
*/

/*
// Pie Chart
const results = [
  { name: "Satisfied", count: 1043, color: "lightblue" },
  { name: "Neutral", count: 563, color: "lightgreen" },
  { name: "Unsatisfied", count: 510, color: "pink" },
  { name: "No comment", count: 175, color: "silver" },
];

let cx = document.querySelector("canvas").getContext("2d");
let total = results.reduce((sum, { count }) => sum + count, 0);

// Start at the top
let currentAngle = -0.5 * Math.PI;
for (let result of results) {
  let sliceAngle = (result.count / total) * 2 * Math.PI;
  cx.beginPath();
  // center = 100, 100; radius =100;
  // from currentAngle, clockwise by slice's angle
  cx.arc(100, 100, 100, currentAngle, currentAngle + sliceAngle);
  currentAngle += sliceAngle;
  cx.lineTo(100, 100);
  cx.fillStyle = result.color;
  cx.fill();
}
*/

/*
// Text

const cx = document.querySelector("canvas").getContext("2d");
cx.font = "14px Georgia";
cx.fillStyle = "fuchsia";
cx.fillText("I can draw text, too!", 10, 50);
*/

/*
// Image

const cx = document.querySelector("canvas").getContext("2d");
const img = document.createElement("img");
img.src = "./hat.png";
img.addEventListener("load", () => {
  for (let x = 10; x < 200; x += 30) {
    cx.drawImage(img, x, 10);
  }
});
*/
/*
// Motion with picture
const cx = document.querySelector("canvas").getContext("2d");
let img = document.createElement("img");
img.src = "./player_big.png";
let spriteW = 48;
let spriteH = 60;
cx.scale(-1, 1);

img.addEventListener("load", () => {
  let cycle = 0;
  let destX = -60;
  let destY = 50;
  setInterval(() => {
    cx.clearRect(destX, destY, spriteW, spriteH);
    cx.drawImage(
      img,
      // source rectangle
      cycle * spriteW,
      0,
      spriteW,
      spriteH,
      // destination rectangle
      destX,
      destY,
      spriteW,
      spriteH
    );

    cycle = (cycle + 1) % 8;
  }, 220);
});
*/

/*
let cx = document.querySelector("canvas").getContext("2d");
cx.scale(3, 1 / 2);
cx.beginPath();
cx.arc(50, 50, 20, 0, 7);
cx.lineWidth = 2;
cx.stroke();
*/

/*
// Translation transformation.

const cx = document.querySelector("canvas").getContext("2d");

// Moved square
cx.translate(110, 30);
cx.fillStyle = "red";
cx.fillRect(0, 0, 80, 80);

//Reset current transformation matrix to  the identity matrix
cx.setTransform(1, 0, 0, 1, 0, 0);

// Unmoved square
cx.fillStyle = "gray";
cx.fillRect(0, 0, 80, 80);
*/

/*
// Mirrored character

let cx = document.querySelector("canvas").getContext("2d");
let img = document.createElement("img");
img.src = "./player_big.png";

let spriteW = 48;
let spriteH = 60;
flipHorizontally(cx, 100 + spriteW / 2);
img.addEventListener("load", () => {
  let cycle = 0;
  setInterval(() => {
    cx.clearRect(0, 0, spriteW, spriteH);
    cx.drawImage(
      img,
      cycle * spriteW,
      0,
      spriteW,
      spriteH,
      0,
      0,
      spriteW,
      spriteH
    );
    cycle = (cycle + 1) % 8;
  }, 120);
});

function flipHorizontally(context, around) {
  context.translate(around, 0);
  context.scale(-1, 1);
  context.translate(-around, 0);
}
*/

/*
let cx = document.querySelector("canvas").getContext("2d");
function branch(length, angle, scale) {
  cx.fillRect(0, 0, 2, length);
  if (length < 8) {
    return;
  }
  cx.save();
  cx.translate(0, length);
  cx.rotate(-angle);
  branch(length * scale, angle, scale);
  cx.rotate(2 * angle);
  branch(length * scale, angle, scale);
  cx.restore();
}

cx.translate(150, 10);
branch(50, 0.5, 0.8);
*/
