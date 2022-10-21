function flyingCatInTheHat() {
  const cat = document.querySelector("#cat");
  const hat = document.querySelector("#hat");
  let angle = Math.PI / 2;
  let lastTime = null;
  let orbDirLeft = -1;
  let orbDirRight = 1;
  let cantFly = 0;
  let width = window.innerWidth / 2;
  let height = window.innerHeight / 2;
  let xCat = width - cat.width;
  let yCat = height - cat.height;
  let xHat = width - hat.width;
  let yHat = height - hat.height;
  function animate(time) {
    if (lastTime !== null) {
      angle += (time - lastTime) * 0.001;
    }
    lastTime = time;
    // cat.style.top = Math.sin(angle) * 40 + 40 + "px";
    // cat.style.left = Math.cos(angle) * 200 + 230 + "px";

    // hat.style.top = Math.sin(angle) * 40 + 40 + "px";
    // hat.style.left = Math.cos(angle) * 200 + 230 + "px";

    // // change direction of orbiting
    // cat.style.left = orbDirLeft * Math.cos(angle) * 200 + 230 + "px";
    // hat.style.left = orbDirLeft * Math.cos(angle) * 200 + 230 + "px";
    // make hat circle around cat

    cat.style.top = Math.sin(angle) * yCat + height + "px";
    cat.style.left = Math.cos(angle) * xCat + width + "px";
    hat.style.top = Math.sin(angle) * yHat + height + "px";
    hat.style.left = Math.cos(angle) * xHat + width + "px";
    requestAnimationFrame((newTime) => animate(newTime, lastTime));
  }
  requestAnimationFrame(animate);
}

flyingCatInTheHat();
