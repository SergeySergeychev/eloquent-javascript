/*
const grid = document.getElementById("grid");
const nextGen = document.getElementById("next");
const gridWidth = 10;
const gridHeigth = 10;

const life = [];
let newLifeCircle = [];

function drawGrid(width, height) {
  const x = width;
  const y = height;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const box = document.createElement("input");
      box.setAttribute("type", "checkbox");
      grid.appendChild(box);
    }
    const newLine = document.createElement("br");
    grid.appendChild(newLine);
  }
}

function generateLiveCells(randomization = 0.25) {
  const cells = grid.childNodes;
  let rowOfCells = [];
  for (const cell of cells) {
    if (cell.type === "checkbox") {
      if (Math.random() < randomization) {
        cell.checked = true;
        rowOfCells.push(cell);
      } else {
        rowOfCells.push(cell);
      }
    } else {
      life.push(rowOfCells);
      rowOfCells = [];
    }
  }
}

function checkTheRuleOfLife(cell, x, y) {
  let isAlive = cell.checked ? true : false;
  const neighbours = findAdjacentNeighbours(x, y);
  if (isAlive) {
    if (neighbours < 2 || neighbours > 3) {
      // cell dies
      isAlive = false;
    } else {
      // cell lives
      isAlive = true;
    }
  } else if (!isAlive) {
    if (neighbours === 3) {
      // cell reborns
      isAlive = true;
    }
  }
  return isAlive;
}

function generateNewLiveCircle(width, height) {
  const x = width;
  const y = height;
  let rowOfCells = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      rowOfCells.push(checkTheRuleOfLife(life[y][x], x, y));
    }
    newLifeCircle.push(rowOfCells);
    rowOfCells = [];
  }
}

function changeTheLife() {
  const newState = newLifeCircle.flat();
  const currentState = life.flat();
  currentState.map((cell, isAlive) => {
    if (newState[isAlive]) {
      cell.checked = true;
    } else {
      cell.checked = false;
    }
  });
  newLifeCircle = [];
}

function findAdjacentNeighbours(x, y) {
  let neighbourCells = 0;
  const ownPosX = x;
  const ownPosY = y;
  const startX = Math.max(x - 1, 0);
  const endX = Math.min(x + 1, gridWidth - 1);
  const startY = Math.max(y - 1, 0);
  const endY = Math.min(y + 1, gridHeigth - 1);
  for (let y = startY, j = 0; y <= endY; j++, y++) {
    for (let x = startX, i = 0; x <= endX; i++, x++) {
      if (life[y][x].checked && !(y === ownPosY && x === ownPosX)) {
        ++neighbourCells;
      }
    }
  }
  return neighbourCells;
}

// Spawn Cells
drawGrid(gridWidth, gridHeigth);
generateLiveCells();

function generationTurn() {
  generateNewLiveCircle(gridWidth, gridHeigth);
  changeTheLife();
}

nextGen.addEventListener("click", generationTurn);
*/

// Solution By Marijn Haverbeke

const width = 15,
  height = 15;

// I will represent the grid as an array of booleans.

let gridNode = document.querySelector("#grid");
// This holds the checkboxes that display the grid in the document.
let checkboxes = [];
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    let box = document.createElement("input");
    box.type = "checkbox";
    gridNode.appendChild(box);
    checkboxes.push(box);
  }
  gridNode.appendChild(document.createElement("br"));
}

function gridFromCheckboxes() {
  return checkboxes.map((box) => box.checked);
}
function checkboxesFromGrid(grid) {
  grid.forEach((value, i) => (checkboxes[i].checked = value));
}
function randomGrid() {
  let result = [];
  for (let i = 0; i < width * height; i++) {
    result.push(Math.random() < 0.3);
  }
  return result;
}

checkboxesFromGrid(randomGrid());

// This does a two-dimensional loop over the square around the given
// x,y position, counting all fields that have a cell but are not the
// center field.
function countNeighbors(grid, x, y) {
  let count = 0;
  for (let y1 = Math.max(0, y - 1); y1 <= Math.min(height - 1, y + 1); y1++) {
    for (let x1 = Math.max(0, x - 1); x1 <= Math.min(width - 1, x + 1); x1++) {
      if ((x1 != x || y1 != y) && grid[x1 + y1 * width]) {
        count++;
      }
    }
  }
  return count;
}

function nextGeneration(grid) {
  let newGrid = new Array(width * height);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let neighbors = countNeighbors(grid, x, y);
      let offset = x + y * width;
      if (neighbors < 2 || neighbors > 3) {
        newGrid[offset] = false;
      } else if (neighbors == 2) {
        newGrid[offset] = grid[offset];
      } else {
        newGrid[offset] = true;
      }
    }
  }
  return newGrid;
}

function turn() {
  checkboxesFromGrid(nextGeneration(gridFromCheckboxes()));
}

document.querySelector("#next").addEventListener("click", turn);

let running = null;
document.querySelector("#run").addEventListener("click", () => {
  if (running) {
    clearInterval(running);
    running = null;
  } else {
    running = setInterval(turn, 400);
  }
});
