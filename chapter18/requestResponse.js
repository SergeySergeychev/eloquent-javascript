// console.log(encodeURIComponent("Yes?"));
// console.log(decodeURIComponent("Yes%3F"));

// fetch("http://127.0.0.1:5500/chapter18/data.txt")
//   .then((response) => {
//     return response.text();
//     console.log(response);
//     console.log(response.status);
//     console.log(response.headers.get("content-type"));
//   })
//   .then(console.log);

// fetch("./data.txt", { method: "DELETE" }).then((response) =>
//   console.log(response.status)
// );

// fetch("./data.txt", { headers: { Range: "bytes=0-4" } })
//   .then((response) => response.text())
//   .then(console.log);

// document.querySelector("input").focus();
// console.log(document.activeElement.tagName);
// document.querySelector("input").blur();
// console.log(document.activeElement.tagName);

// let form = document.querySelector("form");
// console.log(form.elements[1].type);
// console.log(form.elements.password.type);
// console.log(form.elements.name.form == form);

// let form = document.querySelector("form");
// form.addEventListener("submit", (event) => {
//   console.log("Saving value", form.elements.value.value);
//   event.preventDefault();
// });

/*
let textarea = document.querySelector("textarea");
textarea.addEventListener("keydown", (event) => {
  // The key code for F2 happens to be 113
  if (event.keyCode === 113) {
    replaceSelection(textarea, "Khasekhemwy");
    event.preventDefault();
  }
});

function replaceSelection(field, word) {
  let from = field.selectionStart,
    to = field.selectionEnd;
  console.log(from, to);
  field.value = field.value.slice(0, from) + word + field.value.slice(to);
  // Put the cursor after the word
  field.selectionStart = from + word.length;
  field.selectionEnd = from + word.length;
}
*/

/*
let text = document.querySelector("input");
let output = document.querySelector("#length");

text.addEventListener("input", () => {
  output.textContent = text.value.length;
});
*/

// Checkboxes and Radio Buttons
/*
let checkbox = document.querySelector("#purple");

checkbox.addEventListener("change", () => {
  document.body.style.background = checkbox.checked ? "mediumpurple" : "";
});
*/
/*
let buttons = document.querySelectorAll("[name=color]");
for (let button of Array.from(buttons)) {
  button.addEventListener("change", () => {
    document.body.style.background = button.value;
  });
}
*/
// Select fields

/*
let select = document.querySelector("select");
let output = document.querySelector("#output");
select.addEventListener("change", () => {
  let number = 0;
  for (let option of Array.from(select.options)) {
    if (option.selected) {
      number += Number(option.value);
    }
  }
  output.textContent = number;
});
*/

// File Fields

/*
let input = document.querySelector("input");
input.addEventListener("change", () => {
  if (input.files.length > 0) {
    console.log(input.files);
    let file = input.files[0];
    console.log("You chose", file.name);
    if (file.type) console.log(("It has type", file.type));
  }
});
*/

let input = document.querySelector("input");

// input.addEventListener("change", () => {
//   for (let file of Array.from(input.files)) {
//     {
//       let reader = new FileReader();
//       console.log(reader);
//       reader.addEventListener("load", () => {
//         console.log(
//           "File",
//           file.name,
//           "starts with",
//           reader.result.slice(0, 20)
//         );
//       });
//       reader.readAsText(file);
//     }
//   }
// });

/*
function readFileText(file) {
  return new Promise((res, rej) => {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      res(reader);
    });
    reader.addEventListener("error", () => {
      rej(reader.error);
    });
    reader.readAsText(file);
  });
}

input.addEventListener("change", () => {
  for (let file of Array.from(input.files)) {
    readFileText(file).then((reader) =>
      console.log("File", file.name, "starts with", reader.result.slice(0, 20))
    );
  }
});
*/

// Storing Data Client Side

// localStorage.setItem("username", "marijn");
// console.log(localStorage.getItem("username"));
// localStorage.removeItem("username");

let list = document.querySelector("select");
let note = document.querySelector("textarea");
let state;

function setState(newState) {
  list.textContent = "";
  for (let name of Object.keys(newState.notes)) {
    let option = document.createElement("option");
    option.textContent = name;
    if (newState.selected === name) {
      option.selected = true;
    }
    list.appendChild(option);
  }
  note.value = newState.notes[newState.selected];

  localStorage.setItem("Notes", JSON.stringify(newState));
  state = newState;
}

setState(
  JSON.parse(localStorage.getItem("Notes")) || {
    notes: { "shopping list": "Carrots\nRaisins" },
    selected: "shopping list",
  }
);

list.addEventListener("change", () => {
  setState({ notes: state.notes, selected: list.value });
});

note.addEventListener("change", () => {
  setState({
    notes: Object.assign({}, state.notes, { [state.selected]: note.value }),
    selected: state.selected,
  });
});

document.querySelector("button").addEventListener("click", () => {
  let name = prompt("Note name");
  if (name)
    setState({
      notes: Object.assign({}, state.notes, { [name]: "" }),
      selected: name,
    });
});
