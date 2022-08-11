const box = {
  locked: true,
  _content: [],
  unlock() {
    this.locked = false;
  },
  lock() {
    this.locked = true;
  },
  get content() {
    if (this.locked) throw new Error("Locked");
    return this._content;
  },
};

function withBoxUnlocked(body) {
  let alreadyUnlocked = false;
  try {
    if (!box.locked) {
      alreadyUnlocked = true;
    }
    box.unlock();
    return body();
  } finally {
    if (alreadyUnlocked) return box.unlock();
    box.lock();
  }
}

withBoxUnlocked(function () {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function () {
    throw new Error("Pirates on the horizon! Abort!");
  });
} catch (e) {
  console.log("Error raised: " + e);
}

console.log(box.locked);

// solution by Marijn Haverbeke
function withBoxUnlockedMH(body) {
  let locked = box.locked;
  if (!locked) {
    return body();
  }
  box.unlock();
  try {
    return body();
  } finally {
    box.lock();
  }
}
