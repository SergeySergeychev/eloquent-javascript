let canvas = document.querySelector("canvas");
canvas.width = 600;
canvas.height = 300;
let cx = canvas.getContext("2d");
const results = [
  { name: "Satisfied", count: 1043, color: "lightblue" },
  { name: "Neutral", count: 563, color: "lightgreen" },
  { name: "Unsatisfied", count: 510, color: "pink" },
  { name: "No comment", count: 175, color: "silver" },
  { name: "No comment", count: 175, color: "blue" },
  { name: "No comment", count: 175, color: "black" },
];
let total = results.reduce((sum, { count }) => sum + count, 0);
let currentAngle = -0.5 * Math.PI;
let centerX = 300,
  centerY = 150;
let radius = 100;
for (let result of results) {
  let sliceAngle = (result.count / total) * 2 * Math.PI;
  // Positioning the text
  cx.beginPath();
  let offset = 15;
  let middleAngle = currentAngle + sliceAngle / 2;
  let textX = centerX + radius * Math.cos(middleAngle);
  let textXOffset = centerX + (offset + radius) * Math.cos(middleAngle);
  let textY = centerY + radius * Math.sin(middleAngle);
  let textYOffset = centerY + (offset + radius) * Math.sin(middleAngle);

  cx.font = "bold 16px serif";
  cx.fillStyle = result.color;
  if (Math.cos(middleAngle) > 0) {
    cx.fillText(result.name, textXOffset, textYOffset);
  } else {
    cx.fillText(result.name, textXOffset - 8 * result.name.length, textYOffset);
  }
  // Drawing bounding line to Text
  if (result.count / total < 0.15) {
    cx.beginPath();
    cx.moveTo(textX, textY);
    cx.lineTo(textXOffset, textYOffset);
    cx.stroke();
  }
  // Coloring text

  // Drawing Pie Chart
  cx.beginPath();
  cx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
  currentAngle += sliceAngle;
  cx.lineTo(centerX, centerY);
  cx.fillStyle = result.color;
  cx.fill();
}

/*
// Solution by Marijn Haverbeke
const results = [
  { name: "Satisfied", count: 1043, color: "lightblue" },
  { name: "Neutral", count: 563, color: "lightgreen" },
  { name: "Unsatisfied", count: 510, color: "pink" },
  { name: "No comment", count: 175, color: "silver" },
  { name: "No comment", count: 175, color: "blue" },
  { name: "No comment", count: 175, color: "black" },
];
let canvas = document.querySelector("canvas");
canvas.width = 600;
canvas.height = 300;
let cx = canvas.getContext("2d");
let total = results.reduce((sum, { count }) => sum + count, 0);

let currentAngle = -0.5 * Math.PI;
let centerX = 300;
let centerY = 150;
results.forEach((result) => {
  let sliceAngle = (result.count / total) * 2 * Math.PI;
  cx.beginPath();
  cx.arc(centerX, centerY, 100, currentAngle, currentAngle + sliceAngle);
  let middleAngle = currentAngle + 0.5 * sliceAngle;
  let textX = Math.cos(middleAngle) * 120 + centerX;
  let textY = Math.sin(middleAngle) * 120 + centerY;
  cx.textBaseline = "middle";
  if (Math.cos(middleAngle) > 0) {
    cx.textAlign = "left";
  } else {
    cx.textAlign = "right";
  }
  cx.font = "15px sans-serif";
  cx.fillStyle = "black";
  cx.fillText(result.name, textX, textY);
  currentAngle += sliceAngle;
  cx.lineTo(centerX, centerY);
  cx.fillStyle = result.color;
  cx.fill();
});
*/
