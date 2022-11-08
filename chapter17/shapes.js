/*
// 1. Trapezoid
const cx = document.querySelector("canvas").getContext("2d");
cx.beginPath();
cx.moveTo(10, 75);
cx.lineTo(50, 10);
cx.lineTo(160, 10);
cx.lineTo(210, 75);
cx.closePath();
cx.stroke();
*/

/*
// A red diamond
const cx = document.querySelector("canvas").getContext("2d");
cx.fillStyle = "red";
const x = 20;
const y = 20;
const width = 50;
const height = 50;

cx.translate(x + width / 2, y + width / 2);
cx.rotate(Math.PI / 4);
cx.translate(-(x + width / 2), -(y + width / 2));

cx.fillRect(x, y, width, height);
cx.resetTransform()
*/

/*
// Zigzagging line

const cx = document.querySelector("canvas").getContext("2d");
const teeths = 6;
const startX = 20;
const startY = 20;
const teethHeight = 100;
const teethWidth = 20;
const x1 = startX;
const x2 = x1 + teethHeight;

cx.beginPath();
cx.moveTo(startX, startY);
for (
  let i = 0, y1 = startY + teethWidth, y2 = startY + teethWidth / 2;
  i < teeths;
  i++, y1 += teethWidth, y2 += teethWidth
) {
  // draw Teeth
  cx.lineTo(x2, y2);
  cx.lineTo(x1, y1);
}

cx.stroke();
*/

// solution by Marijn Haverbeke
// Trapezoid
let cx = document.querySelector("canvas").getContext("2d");
function trapezoid(x, y) {
  cx.beginPath();
  cx.moveTo(x, y);
  cx.lineTo(x + 50, y);
  cx.lineTo(x + 70, y + 50);
  cx.lineTo(x - 20, y + 50);
  cx.closePath();
  cx.stroke();
}

function diamond(x, y) {
  cx.translate(x + 30, y + 30);
  cx.rotate(Math.PI / 4);
  cx.fillStyle = "red";
  cx.fillRect(-30, -30, 60, 60);
  cx.resetTransform();
}

function zigzag(x, y) {
  cx.beginPath();
  cx.moveTo(x, y);
  for (let i = 0; i < 8; i++) {
    cx.lineTo(x + 80, y + i * 8 + 4);
    cx.lineTo(x, y + i * 8 + 8);
  }
  cx.stroke();
}

function spiral(x, y) {
  let radius = 50,
    xCenter = x + radius,
    yCenter = y + radius;
  cx.beginPath();
  cx.moveTo(xCenter, yCenter);
  for (let i = 0; i < 300; i++) {
    let angle = (i * Math.PI) / 30;
    let dist = (radius * i) / 300;
    cx.lineTo(
      xCenter + Math.cos(angle) * dist,
      yCenter + Math.sin(angle) * dist
    );
  }
  cx.stroke();
}

function star(x, y) {
  let radius = 50,
    xCenter = x + radius,
    yCenter = y + radius;

  cx.beginPath();
  cx.moveTo(xCenter, yCenter);

  for (let i = 0; i <= 8; i++) {
    let angle = (i * Math.PI) / 4;
    cx.quadraticCurveTo(
      xCenter,
      yCenter,
      xCenter + Math.cos(angle) * radius,
      yCenter + Math.sin(angle) * radius
    );
  }
  cx.fillStyle = "gold";
  cx.fill();
}

star(100, 20);
