const URL = "https://eloquentjavascript.net/author";
const headers = [
  { headers: { Accept: "text/plain" } },
  { headers: { Accept: "text/html" } },
  { headers: { Accept: "application/json" } },
  { headers: { Accept: "application/rainbows+unicorns" } },
];

for (let header of headers) {
  fetch(URL, header)
    .then((response) => response.text())
    .then(console.log);
}

/*
// Solution by Marijn Haverbeke

const url = "https://eloquentjavascript.net/author";
const types = [
  "text/plain",
  "text/html",
  "application/json",
  "application/rainbows+unicorns",
];
async function showTypes() {
  for (let type of types) {
    let resp = await fetch(url, { headers: { accept: type } });
    console.log(`${type}: ${await resp.text()}\n`);
  }
}
showTypes();
*/
