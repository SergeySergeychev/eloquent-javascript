let simpleLevelPlan = [
  `
......................
..#................#..
..#..............=.#..
..#.........o......#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`,
];

class Level {
  constructor(plan) {
    let rows = plan
      .trim()
      .split("\n")
      .map((l) => [...l]);
    this.height = rows.length;
    this.width = rows[0].length;
    this.startActors = [];

    this.rows = rows.map((row, y) => {
      return row.map((ch, x) => {
        let type = levelChars[ch];
        if (typeof type === "string") return type;
        this.startActors.push(type.create(new Vec(x, y), ch));
        return "empty";
      });
    });
  }
}

class State {
  constructor(level, actors, status) {
    this.level = level;
    this.actors = actors;
    this.status = status;
  }
  static start(level) {
    return new State(level, level.startActors, "playing");
  }
  get player() {
    return this.actors.find((a) => a.type === "player");
  }
  get monster() {
    return this.actors.find((a) => a.type === "monster");
  }
}
//////////////////////////Helper class////////////////////////////
class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  plus(other) {
    return new Vec(this.x + other.x, this.y + other.y);
  }
  times(factor) {
    return new Vec(this.x * factor, this.y * factor);
  }
}

/////////////////////////ACTORS/////////////////////////////////////

class Player {
  constructor(pos, speed) {
    this.pos = pos;
    this.speed = speed;
  }
  get type() {
    return "player";
  }

  static create(pos) {
    return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));
  }
}

Player.prototype.size = new Vec(0.8, 1.5);

class Lava {
  constructor(pos, speed, reset) {
    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
  }

  get type() {
    return "lava";
  }

  static create(pos, ch) {
    if (ch === "=") {
      return new Lava(pos, new Vec(2, 0));
    } else if (ch === "|") {
      return new Lava(pos, new Vec(0, 2));
    } else if (ch === "v") {
      return new Lava(pos, new Vec(0, 3), pos);
    }
  }
}

Lava.prototype.size = new Vec(1, 1);

class Coin {
  constructor(pos, basePos, wobble) {
    this.pos = pos;
    this.basePos = basePos;
    this.wobble = wobble;
  }

  get type() {
    return "coin";
  }

  static create(pos) {
    let basePos = pos.plus(new Vec(0.2, 0.1));
    return new Coin(basePos, basePos, Math.random() * 2 * Math.PI);
  }
}

Coin.prototype.size = new Vec(0.6, 0.6);

class Monster {
  constructor(pos) {
    this.pos = pos;
  }

  get type() {
    return "monster";
  }

  static create(pos) {
    return new Monster(pos.plus(new Vec(0, -1)));
  }
}

Monster.prototype.size = new Vec(1.2, 2);

const levelChars = {
  ".": "empty",
  "#": "wall",
  "+": "lava",
  "@": Player,
  o: Coin,
  "=": Lava,
  "|": Lava,
  v: Lava,
  M: Monster,
};

// DRAWING
const scale = 20;

class CanvasDisplay {
  constructor(parent, level) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = Math.min(600, level.width * scale);
    this.canvas.height = Math.min(450, level.height * scale);
    parent.appendChild(this.canvas);
    this.cx = this.canvas.getContext("2d");

    this.flipPlayer = false;
    this.viewport = {
      left: 0,
      top: 0,
      width: this.canvas.width / scale,
      height: this.canvas.height / scale,
    };
  }

  clear() {
    this.canvas.remove();
  }
}

CanvasDisplay.prototype.syncState = function (state) {
  this.updateViewport(state);
  this.clearDisplay(state.status);
  this.drawBackground(state.level);
  this.drawActors(state.actors);
};

CanvasDisplay.prototype.updateViewport = function (state) {
  let view = this.viewport,
    margin = view.width / 3;
  let player = state.player;
  let center = player.pos.plus(player.size.times(0.5));
  if (center.x < view.left + margin) {
    view.left = Math.max(center.x - margin, 0);
  } else if (center.x > view.left + view.width - margin) {
    view.left = Math.min(
      center.x + margin - view.width,
      state.level.width - view.width
    );
  }
  if (center.y < view.top + margin) {
    view.top = Math.max(center.y - margin, 0);
  } else if (center.y > view.top + view.height - margin) {
    view.top = Math.min(
      center.y + margin - view.height,
      state.level.height - view.height
    );
  }
};

CanvasDisplay.prototype.clearDisplay = function (status) {
  if (status == "won") {
    this.cx.fillStyle = "rgb(68, 191, 255)";
  } else if (status == "lost") {
    this.cx.fillStyle = "rgb(44, 136, 214)";
  } else {
    this.cx.fillStyle = "rgb(52, 166, 251)";
  }
  this.cx.fillRect(0, 0, this.canvas.width, this.canvas.height);
};

const otherSprites = document.createElement("img");
otherSprites.src = "./sprites.png";

CanvasDisplay.prototype.drawBackground = function (level) {
  let { left, top, width, height } = this.viewport;
  let xStart = Math.floor(left);
  let xEnd = Math.ceil(left + width);
  let yStart = Math.floor(top);
  let yEnd = Math.ceil(top + height);

  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) {
      let tile = level.rows[y][x];
      if (tile === "empty") continue;
      let screenX = (x - left) * scale;
      let screenY = (y - top) * scale;
      let tileX = tile === "lava" ? scale : 0;
      this.cx.drawImage(
        otherSprites,
        tileX,
        0,
        scale,
        scale,
        screenX,
        screenY,
        scale,
        scale
      );
    }
  }
};

let playerSprites = document.createElement("img");
playerSprites.src = "./player.png";
const playerXOverlap = 4;

CanvasDisplay.prototype.drawPlayer = function (player, x, y, width, height) {
  width += playerXOverlap * 2;
  x -= playerXOverlap;
  if (player.speed.x != 0) {
    this.flipPlayer = player.speed.x < 0;
  }

  let tile = 8;
  if (player.speed.y != 0) {
    tile = 9;
  } else if (player.speed.x != 0) {
    tile = Math.floor(Date.now() / 60) % 8;
  }

  this.cx.save();
  if (this.flipPlayer) {
    flipHorizontally(this.cx, x + width / 2);
  }

  let tileX = tile * width;
  this.cx.drawImage(
    playerSprites,
    tileX,
    0,
    width,
    height,
    x,
    y,
    width,
    height
  );
  this.cx.restore();
};

// Flip direction of the player

function flipHorizontally(context, around) {
  context.translate(around, 0);
  context.scale(-1, 1);
  context.translate(-around, 0);
}

CanvasDisplay.prototype.drawActors = function (actors) {
  for (let actor of actors) {
    let width = actor.size.x * scale;
    let height = actor.size.y * scale;
    let x = (actor.pos.x - this.viewport.left) * scale;
    let y = (actor.pos.y - this.viewport.top) * scale;
    if (actor.type === "player") {
      this.drawPlayer(actor, x, y, width, height);
    } else {
      let tileX = (actor.type === "coin" ? 2 : 1) * scale;
      this.cx.drawImage(
        otherSprites,
        tileX,
        0,
        width,
        height,
        x,
        y,
        width,
        height
      );
    }
  }
};

// Motion and Collisions

Level.prototype.touches = function (pos, size, type) {
  let xStart = Math.floor(pos.x);
  let xEnd = Math.ceil(pos.x + size.x);
  let yStart = Math.floor(pos.y);
  let yEnd = Math.ceil(pos.y + size.y);
  for (let y = yStart; y < yEnd; y++) {
    for (let x = xStart; x < xEnd; x++) {
      let isOutside = x < 0 || x >= this.width || y < 0 || y >= this.height;
      let here = isOutside ? "wall" : this.rows[y][x];
      if (here == type) {
        return true;
      }
    }
  }
  return false;
};

State.prototype.update = function (time, keys) {
  let actors = this.actors.map((actor) => actor.update(time, this, keys));
  let newState = new State(this.level, actors, this.status);

  if (newState.status !== "playing") {
    return newState;
  }

  let player = newState.player;

  if (this.level.touches(player.pos, player.size, "lava")) {
    return new State(this.level, actors, "lost");
  }

  for (let actor of actors) {
    if (actor !== player && overlap(actor, player)) {
      newState = actor.collide(newState);
    }
  }
  return newState;
};

function overlap(actor1, actor2) {
  return (
    actor1.pos.x + actor1.size.x > actor2.pos.x &&
    actor1.pos.x < actor2.pos.x + actor2.size.x &&
    actor1.pos.y + actor1.size.y > actor2.pos.y &&
    actor1.pos.y < actor2.pos.y + actor2.size.y
  );
}

// Collisions
Monster.prototype.collide = function (state) {
  let gameActors = state.actors;
  let player = state.player;
  let dead = player.pos.y + player.size.y < this.pos.y + 0.5;
  if (dead) {
    // Remove monster from the game.
    gameActors = gameActors.filter((a) => a != this);
    return new State(state.level, gameActors, "playing");
  }
  return new State(state.level, gameActors, "lost");
};

Lava.prototype.collide = function (state) {
  return new State(state.level, state.actors, "lost");
};

Coin.prototype.collide = function (state) {
  let filtered = state.actors.filter((a) => a !== this);
  let status = state.status;
  if (!filtered.some((a) => a.type === "coin")) status = "won";
  return new State(state.level, filtered, status);
};

// Actors updates
const monsterSpeed = 4;
Monster.prototype.update = function (time, state) {
  let player = state.player;
  let speed = (player.pos.x < this.pos.x ? -1 : 1) * time * monsterSpeed;
  let newPos = new Vec(this.pos.x + speed, this.pos.y);
  if (state.level.touches(newPos, this.size, "wall")) {
    return this;
  } else {
    {
      return new Monster(newPos);
    }
  }
};

Lava.prototype.update = function (time, state) {
  let newPos = this.pos.plus(this.speed.times(time));
  if (!state.level.touches(newPos, this.size, "wall")) {
    return new Lava(newPos, this.speed, this.reset);
  } else if (this.reset) {
    return new Lava(this.reset, this.speed, this.reset);
  } else {
    return new Lava(this.pos, this.speed.times(-1));
  }
};

const wobbleSpeed = 8,
  wobbleDist = 0.07;
Coin.prototype.update = function (time) {
  let wobble = this.wobble + time * wobbleSpeed;
  let wobblePos = Math.sin(wobble) * wobbleDist;
  return new Coin(
    this.basePos.plus(new Vec(0, wobblePos)),
    this.basePos,
    wobble
  );
};

const playerXSpeed = 7;
const gravity = 30;
const jumpSpeed = 17;

Player.prototype.update = function (time, state, keys) {
  let xSpeed = 0;
  if (keys.ArrowLeft) xSpeed -= playerXSpeed;
  if (keys.ArrowRight) xSpeed += playerXSpeed;
  let pos = this.pos;
  let movedX = pos.plus(new Vec(xSpeed * time, 0));
  if (!state.level.touches(movedX, this.size, "wall")) {
    pos = movedX;
  }

  let ySpeed = this.speed.y + time * gravity;
  let movedY = pos.plus(new Vec(0, ySpeed * time));
  if (!state.level.touches(movedY, this.size, "wall")) {
    pos = movedY;
  } else if (keys.ArrowUp && ySpeed > 0) {
    ySpeed = -jumpSpeed;
  } else {
    ySpeed = 0;
  }
  return new Player(pos, new Vec(xSpeed, ySpeed));
};

// Track Keys
// Pause the Game
// Key Handlers
let paused = false;

function trackKeys(keys) {
  let down = Object.create(null);
  function track(event) {
    if (keys.includes(event.key)) {
      down[event.key] = event.type === "keydown";
      event.preventDefault();
    }
  }
  addEventListener("keydown", track);
  addEventListener("keyup", track);

  down.unregisterHandlers = function () {
    removeEventListener("keydown", track);
    removeEventListener("keyup", track);
  };
  return down;
}

// Running the Game

function runAnimation(frameFunc) {
  let lastTime = null;
  function frame(time) {
    if (lastTime !== null) {
      let timeStep = Math.min(time - lastTime, 100) / 1000;
      if (frameFunc(timeStep) === false) return;
    }
    lastTime = time;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function runLevel(level, Display) {
  let display = new Display(document.body, level);
  let state = State.start(level);
  let ending = 1;
  let running = "yes";

  return new Promise((resolve) => {
    function escHandler(event) {
      if (event.key !== "Escape") return;
      event.preventDefault();
      if (running === "no") {
        running = "yes";
        runAnimation(frame);
      } else if (running === "yes") {
        running = "pausing";
      } else {
        running = "yes";
      }
    }

    addEventListener("keydown", escHandler);
    let arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);
    function frame(time) {
      if (running === "pausing") {
        running = "no";
        return false;
      }
      state = state.update(time, arrowKeys);
      display.syncState(state);
      if (state.status === "playing") {
        return true;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        display.clear();
        window.removeEventListener("keydown", escHandler);
        arrowKeys.unregisterHandlers();
        resolve(state.status);
        return false;
      }
    }
    runAnimation(frame);
  });
}
// GAME OVER EXERCISE

Player.prototype.lives = 3;
Player.prototype.minusLife = function () {
  return --Player.prototype.lives;
};

async function runGame(plans, Display) {
  for (let level = 0; level < plans.length; ) {
    let status = await runLevel(new Level(plans[level]), Display);
    if (status === "won") {
      level++;
    }
    if (status === "lost") {
      Player.prototype.minusLife();
      displayLives(`${"♥".repeat(Player.prototype.lives)}`);
      if (Player.prototype.lives === 0) {
        console.log("Game Over");
        Player.prototype.lives = 3;
        displayLives(`${"♥".repeat(Player.prototype.lives)}`);
        level = 0;
      }
    }
  }
  console.log("You've won!");
}
function displayLives(livesLeft) {
  const lives = document.getElementsByClassName("lives")[0];
  lives.remove();
  lives.textContent = livesLeft;
  document.body.appendChild(lives);
}

runGame(GAME_LEVELS, CanvasDisplay);
