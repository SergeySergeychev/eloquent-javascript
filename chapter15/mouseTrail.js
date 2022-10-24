let route = [];

function getLatestRoute(event) {
  let trail = document.createElement("div");
  trail.className = "trail";
  trail.style.top = event.pageY - 3 + "px";
  trail.style.left = event.pageX - 3 + "px";
  route.push(trail);

  if (route.length > 15) {
    removeFirstStep();
  }
}
// Bad coding - each time mousemove triggers, all div elements created as new one.
// If i increase route length code starts to freeze
function updateRoute() {
  for (let path of route) {
    document.body.appendChild(path);
  }
}
function removeFirstStep() {
  route[0].remove();
  route = route.slice(1);
}

addEventListener("mousemove", getLatestRoute);
addEventListener("mousemove", updateRoute);

// Solution by Marijn Haverbeke
// let dots = [];
// for (let i = 0; i < 30; i++) {
//   let node = document.createElement("div");
//   node.className = "trail";
//   document.body.appendChild(node);
//   dots.push(node);
// }

// let currentDot = 0;
// window.addEventListener("mousemove", (event) => {
//   let dot = dots[currentDot];
//   dot.style.left = event.pageX - 3 + "px";
//   dot.style.top = event.pageY - 3 + "px";
//   currentDot = (currentDot + 1) % dots.length;
//   console.log(currentDot);
// });
