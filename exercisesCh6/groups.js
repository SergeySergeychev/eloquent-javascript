class Group {
  constructor() {
    this.entries = {};
    this.size = 0;
  }
  add(value) {
    let index = this.size;
    if (!this.has(value)) {
      this.entries[index] = value;
      this.size++;
    }
  }

  delete(value) {
    let changeIndexOfNextEl = false;

    for (let [key, entry] of Object.entries(this.entries)) {
      // Delete property if it exists
      if (entry === value) {
        delete this.entries[key];
        changeIndexOfNextEl = true;
        this.size--;
      }
      // Change index after deleted property
      if (changeIndexOfNextEl === true && entry !== value) {
        this.entries[key - 1] = entry;
        delete this.entries[key];
      }
    }
  }

  has(value) {
    return Object.values(this.entries).includes(value);
  }

  static from(iterable) {
    if (iterable[Symbol.iterator]) {
      const group = new Group();
      for (let i of iterable) {
        group.add(i);
      }
      return group;
    }
  }
}

class GroupIterator {
  constructor(group) {
    this.index = 0;
    this.group = group;
  }

  next() {
    if (this.index === this.group.size) {
      return { done: true };
    }

    let value = {
      key: this.index,
      value: this.group.entries[this.index],
    };
    this.index++;
    return { value, done: false };
  }
}
Group.prototype[Symbol.iterator] = function () {
  return new GroupIterator(this);
};

let groupByMe = Group.from([10, 20, 30, 40, 50]);
for (let { value } of groupByMe) {
  console.log(value);
}
// Solution by Marijn Haverbeke
class GroupByMH {
  constructor() {
    this.members = [];
  }

  add(value) {
    if (!this.has(value)) {
      this.members.push(value);
    }
  }

  delete(value) {
    this.members = this.members.filter((v) => v !== value);
  }

  has(value) {
    return this.members.includes(value);
  }

  static from(collection) {
    let group = new GroupByMH();
    for (let value of collection) {
      group.add(value);
    }
    return group;
  }
  // [Symbol.iterator]() {
  //   return new GroupIteratorByMH(this);
  // }
}

class GroupIteratorByMH {
  constructor(group) {
    this.group = group;
    this.position = 0;
  }

  next() {
    if (this.position >= this.group.members.length) {
      return { done: true };
    } else {
      let result = { value: this.group.members[this.position], done: false };
      this.position++;
      return result;
    }
  }
}

GroupByMH.prototype[Symbol.iterator] = function* () {
  for (let i = 0; i < this.members.length; i++) {
    yield this.members[i];
  }
};
let group = GroupByMH.from([10, 20, 30, 40, 50]);
for (let value of group) {
  console.log(value);
}
