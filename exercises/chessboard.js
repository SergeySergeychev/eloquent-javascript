// page 38
const boardSize = 8;
let lineNumber = 1;
let chessBoard = "";

function drawLine() {
  let line = "";
  const isLineOdd = lineNumber % 2 !== 0 ? true : false;

  for (let blackField = "#", whiteField = " "; boardSize > line.length; ) {
    isLineOdd
      ? (line += whiteField + blackField)
      : (line += blackField + whiteField);
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
