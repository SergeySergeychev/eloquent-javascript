const MOUNTAINS = [
  { name: "Kilimanjaro", height: 5895, place: "Tanzania" },
  { name: "Everest", height: 8848, place: "Nepal" },
  { name: "Mount Fuji", height: 3776, place: "Japan" },
  { name: "Vaalserberg", height: 323, place: "Netherlands" },
  { name: "Denali", height: 6168, place: "United States" },
  { name: "Popocatepetl", height: 5465, place: "Mexico" },
  { name: "Mont Blanc", height: 4808, place: "Italy/France" },
];

function buildTable(elements, id) {
  const table = document.createElement("table");
  const tablesId = document.getElementById(id);
  const tableHeadings = Object.keys(elements[0]);
  const tableData = elements.map((element) => Object.values(element));
  const headingCell = "th";
  const regularCell = "td";
  let writtenHeading = false;

  function buildTableRow(headings, cell) {
    let tableRow = document.createElement("tr");
    for (let heading of headings) {
      const rowCell = document.createElement(cell);
      rowCell.appendChild(document.createTextNode(heading));
      tableRow.appendChild(rowCell);
    }
    return tableRow;
  }

  // Fill the table with data and heading
  for (let data of tableData) {
    if (!writtenHeading) {
      table.appendChild(buildTableRow(tableHeadings, headingCell));
      writtenHeading = true;
    }
    table.appendChild(buildTableRow(data, regularCell));
  }
  // Append to parent el. and center the table
  tablesId.appendChild(table);
  tablesId.style.textAlign = "center";

  const numbersAllignedToRight = Array.from(document.getElementsByTagName("td"))
    .filter((el) => {
      const regexp = /^\d+$/;
      return regexp.test(el.innerHTML);
    })
    .forEach((number) => (number.style.textAlign = "right"));
}

// Solution by Marijn Haverbeke

function buildTableMH(data) {
  let table = document.createElement("table");

  let fields = Object.keys(data[0]);
  let headRow = document.createElement("tr");
  fields.forEach((field) => {
    let headCell = document.createElement("th");
    headCell.appendChild(document.createTextNode(field));
    headRow.appendChild(headCell);
  });
  table.appendChild(headRow);

  data.forEach((object) => {
    let row = document.createElement("tr");
    fields.forEach((field) => {
      let cell = document.createElement("td");
      cell.appendChild(document.createTextNode(object[field]));
      if (typeof object[field] === "number") {
        cell.style.textAlign = "right";
      }
      row.appendChild(cell);
    });
    table.appendChild(row);
  });
  return table;
}

// console.log(buildTable(MOUNTAINS, "mountains"));
document.querySelector("#mountains").appendChild(buildTableMH(MOUNTAINS));
