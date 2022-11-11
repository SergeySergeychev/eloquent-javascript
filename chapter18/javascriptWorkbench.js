const code = document.getElementById("code");
const button = document.getElementById("button");
const output = document.getElementById("output");

button.addEventListener("click", () => {
  const result = new Function(code.value)();
  output.textContent = result;
  output.style.color = "purple";
});

// Solution By Marijn Haverbeke

// document.querySelector("#button").addEventListener("click", () => {
//   let code = document.querySelector("#code").value;
//   let outputNode = document.querySelector("#output");
//   try {
//     let result = Function(code)();
//     outputNode.innerText = String(result);
//   } catch (e) {
//     outputNode.innerText = "Error: " + e;
//   }
// });
