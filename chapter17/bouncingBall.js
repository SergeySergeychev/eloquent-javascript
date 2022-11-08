let canvas = document.querySelector("canvas");
canvas.width = 400;
canvas.height = 400;
let cx = canvas.getContext("2d");

class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }
  times(factor) {
    return new Vec(this.x * factor, this.y * factor);
  }
}

function runAnimation() {
  let lastTime = null;
  function frame(time) {
    if (lastTime !== null) {
      updateAnimation(Math.min(time - lastTime, 100) / 1000);
    }
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function drawBox(x, y, height, width, color) {
  cx.beginPath();
  cx.strokeStyle = color;
  cx.lineWidth = 3;
  cx.strokeRect(x, y, height, width);
  return {
    top: new Vec(x + width / 2, y + 2 * cx.lineWidth),
    bottom: new Vec(x + width / 2, y + height - 2 * cx.lineWidth),
    center: new Vec(x + width / 2, y + height / 2),
    right: new Vec(x + width - 2 * cx.lineWidth, y),
    left: new Vec(x + 2 * cx.lineWidth, y),
  };
}

class Ball {
  constructor(pos, speed, color) {
    this.pos = pos;
    this.speed = speed;
    this.color = color;
    this.directionX = 1;
    this.directionY = 1;
    this.radius = 10;
  }

  drawBall() {
    cx.beginPath();
    cx.fillStyle = this.color;
    cx.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    cx.fill();
  }
  update(time) {
    if (
      this.pos.y + this.radius / 2 > box.bottom.y ||
      this.pos.y - this.radius / 2 < box.top.y
    ) {
      this.directionY *= -1;
      this.speed.y = this.speed.y * this.directionY;
    }
    if (
      this.pos.x + this.radius / 2 > box.right.x ||
      this.pos.x - this.radius / 2 < box.left.x
    ) {
      this.directionX *= -1;
      this.speed.x = this.speed.x * this.directionX;
    }
    this.pos = this.pos.plus(this.speed.times(time));
  }
}

const box = drawBox(20, 20, 300, 300, "blue");
const ball = new Ball(box.center, new Vec(60, 90), "red");
const ballTwo = new Ball(box.center, new Vec(60, 30), "blue");
const ballThree = new Ball(box.center, new Vec(60, 50), "green");

function updateAnimation(step) {
  // Update viewport
  cx.clearRect(0, 0, canvas.width, canvas.height);

  drawBox(20, 20, 300, 300, "blue");
  ball.update(step);
  ball.drawBall();
  ballTwo.update(step);
  ballTwo.drawBall();
  ballThree.update(step);
  ballThree.drawBall();

  // Start animation
}
runAnimation();

/*
// Solution by Marijn Haverbeke
let canvas = document.querySelector("canvas");
canvas.width = 400;
canvas.height = 400;
let cx = canvas.getContext("2d");
let x = 100;
let y = 300;
let radius = 10;
let speedX = 100;
let speedY = 60;

function runAnimation() {
  let lastTime = null;
  function frame(time) {
    if (lastTime !== null) {
      updateAnimation(Math.min(100, time - lastTime) / 1000);
    }
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function updateAnimation(step) {
  cx.clearRect(0, 0, 400, 400);
  cx.strokeStyle = "blue";
  cx.lineWidth = 4;
  cx.strokeRect(25, 25, 350, 350);

  x += step * speedX;
  y += step * speedY;

  if (x < 25 + radius || x > 375 - radius) speedX = -speedX;
  if (y < 25 + radius || y > 375 - radius) speedY = -speedY;

  cx.fillStyle = "red";
  cx.beginPath();
  cx.arc(x, y, radius, 0, 7);
  cx.fill();
}

runAnimation();
*/
