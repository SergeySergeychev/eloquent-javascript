// page 38
const boardSize = 4;
let lineNumber = 1;
let chessBoard = "";

function drawLine() {
  let line = "";
  const isLineYOdd = lineNumber % 2 !== 0 ? true : false;

  for (
    let blackField = "#", whiteField = " ", lineX = 1;
    boardSize > line.length;
    lineX++
  ) {
    const isLineXOdd = lineX % 2 !== 0 ? true : false;
    if (isLineYOdd) {
      isLineXOdd ? (line += whiteField) : (line += blackField);
    } else {
      isLineXOdd ? (line += blackField) : (line += whiteField);
    }
  }
  return line + "\n";
}

// Draw chessboard
while (boardSize >= lineNumber) {
  chessBoard += drawLine();
  lineNumber++;
}
console.log(chessBoard);

// Solution by Marijn Haverbeke
let board = "";

for (let y = 0; y < boardSize; y++) {
  for (let x = 0; x < boardSize; x++) {
    if ((x + y) % 2 === 0) {
      board += " ";
    } else {
      board += "#";
    }
  }
  board += "\n";
}
console.log(board);
