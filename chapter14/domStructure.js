function talksAbout(node, string) {
  if (node.nodeType === Node.ELEMENT_NODE) {
    for (child of node.childNodes) {
      if (talksAbout(child, string)) {
        return true;
      }
    }
    return false;
  } else if (node.nodeType === Node.TEXT_NODE) {
    return node.nodeValue.indexOf(string) > -1;
  }
}

let link = document.body.getElementsByTagName("a")[0];
let falcon = document.getElementById("falcon");
let paragraphs = document.getElementsByTagName("p");
document.body.insertBefore(paragraphs[4], paragraphs[2]);
document.body.replaceChild(paragraphs[3], paragraphs[4]);

function replaceImages() {
  let images = document.getElementsByTagName("img");
  for (let i = images.length - 1; i >= 0; i--) {
    let image = images[i];
    if (image.alt) {
      let text = document.createTextNode(image.alt);
      image.parentNode.replaceChild(text, image);
    }
  }
}

function elt(type, ...children) {
  let node = document.createElement(type);
  for (let child of children) {
    if (typeof child !== "string") {
      node.appendChild(child);
    } else {
      node.appendChild(document.createTextNode(child));
    }
  }
  return node;
}

document
  .getElementById("quote")
  .appendChild(
    elt(
      "footer",
      "—",
      elt("strong", "Karl Popper"),
      ", preface to the second edition of ",
      elt("em", "The Open Society and Its Enemies"),
      ", 1950"
    )
  );

let paras = document.body.getElementsByTagName("p");
for (let paragraph of paras) {
  if (paragraph.getAttribute("data-classified") === "secret") {
    paragraph.remove();
  }
}

let para = document.getElementsByTagName("p")[7];

function time(name, action) {
  let start = Date.now(); // Current time in ms
  action();
  console.log(`${name} took ${Date.now() - start} ms`);
}

/*
time("naive", () => {
  let target = document.getElementById("one");
  while (target.offsetWidth < 2000) {
    target.appendChild(document.createTextNode("X"));
  }
});

time("clever", () => {
  let target = document.getElementById("two");
  target.appendChild(document.createTextNode("XXXXX"));
  let total = Math.ceil(2000 / (target.offsetWidth / 5));
  target.firstChild.nodeValue = "X".repeat(total);
});
*/

let box = document.getElementById("box");
box.style.border = "5px dotted purple";

function show(selector) {
  return document.querySelectorAll(selector);
}

function catFly() {
  let cat = document.getElementById("flying-cat");
  let angle = Math.PI / 2;
  function animate(time, lastTime) {
    if (lastTime != null) {
      angle += (time - lastTime) * 0.001;
    }
    cat.style.top = Math.sin(angle) * 20 + "px";
    cat.style.left = Math.cos(angle) * 200 + "px";
    requestAnimationFrame((newTime) => {
      return animate(newTime, time);
    });
  }
  requestAnimationFrame(animate);
}

catFly();
