const bigOak = this.crowTech.bigOak;
const churchTower = this.crowTech.churchTower;
const defineRequestType = this.crowTech.defineRequestType;
const everywhere = this.crowTech.everywhere;

// bigOak.readStorage("food caches", (caches) => {
//   let firstCache = caches[0];
//   bigOak.readStorage(firstCache, (info) => {
//     // console.log(info);
//   });
// });

defineRequestType("note", (nest, content, source, done) => {
  console.log(`${nest.name} recieved note ${content}`);
  done();
});

// bigOak.send(
//   "Cow Pasture",
//   "note",
//   "Let's caw loudly at 7pm",
//   () => "Note delivered"
// );

let fifteen = Promise.resolve(15).then((value) => "Got " + value);

function storage(nest, name) {
  return new Promise((resolve) => {
    nest.readStorage(name, (result) => resolve(result));
  });
}

// storage(bigOak, "scalpel").then(console.log);

new Promise((_, reject) => reject(new Error("Fail")))
  .then((value) => console.log("Handler 1"))
  .catch((reason) => {
    // console.log("Caught failure " + reason);
    return "nothing";
  });
// .then((value) => console.log("Handler 2", value));

class Timeout extends Error {}

function request(nest, target, type, content) {
  return new Promise((resolve, reject) => {
    let done = false;
    function attempt(n) {
      nest.send(target, type, content, (failed, value) => {
        done = true;
        if (failed) reject(failed);
        else resolve(value);
      });
      setTimeout(() => {
        if (done) return;
        else if (n < 3) attempt(n + 1);
        else reject(new Timeout("Timed out"));
      }, 2500);
    }
    attempt(1);
  });
}
let count = 0;
function requestType(name, handler) {
  defineRequestType(name, (nest, content, source, callback) => {
    try {
      Promise.resolve(handler(nest, content, source)).then(
        (response) => callback(null, response),
        (failure) => callback(failure)
      );
    } catch (exception) {
      callback(exception);
    }
  });
}

// requestType("ping", () => "pong");

function availableNeighbors(nest) {
  let requests = nest.neighbors.map((neighbor) => {
    return request(nest, neighbor, "ping").then(
      () => true,
      () => false
    );
  });
  return Promise.all(requests).then((result) => {
    return nest.neighbors.filter((_, i) => result[i]);
  });
}

// availableNeighbors(bigOak);
everywhere((nest) => {
  nest.state.gossip = [];
});

function sendGossip(nest, message, exceptFor = null) {
  nest.state.gossip.push(message);
  for (let neighbor of nest.neighbors) {
    if (neighbor == exceptFor) continue;
    request(nest, neighbor, "gossip", message);
  }
}

// requestType("gossip", (nest, message, source) => {
//   if (nest.state.gossip.includes(message)) return;
//   console.log(`${nest.name} received gossip '${message}' from ${source}`);
//   sendGossip(nest, message, source);
// });

// sendGossip(bigOak, "Kids with airgun in the park");

requestType("connections", (nest, { name, neighbors }, source) => {
  let connections = nest.state.connections;
  if (JSON.stringify(connections.get(name)) == JSON.stringify(neighbors))
    return;
  connections.set(name, neighbors);
  broadcastConnections(nest, name, source);
});

function broadcastConnections(nest, name, exceptFor = null) {
  for (let neighbor of nest.neighbors) {
    if (neighbor == exceptFor) continue;
    request(nest, neighbor, "connections", {
      name,
      neighbors: nest.state.connections.get(name),
    });
  }
}

let = everywhere((nest) => {
  nest.state.connections = new Map();
  nest.state.connections.set(nest.name, nest.neighbors);
  broadcastConnections(nest, nest.name);
});

function findRoute(from, to, connections) {
  let work = [{ at: from, via: null }];
  for (let i = 0; i < work.length; i++) {
    let { at, via } = work[i];
    for (let next of connections.get(at) || []) {
      if (next === to) return via;
      if (!work.some((w) => w.at == next)) {
        work.push({ at: next, via: via || next });
      }
    }
  }
  return null;
}

function routeRequest(nest, target, type, content) {
  if (nest.neighbors.includes(target)) {
    return request(nest, target, type, content);
  } else {
    let via = findRoute(nest.name, target, nest.state.connections);
    if (!via) throw new Error(`No route to ${target}`);
    return request(nest, via, "route", { target, type, content });
  }
}

requestType("route", (nest, { target, type, content }) => {
  return routeRequest(nest, target, type, content);
});

// setTimeout(() => {
//   routeRequest(bigOak, "Church Tower", "note", "Incoming jackdaws!");
// }, 2500);

requestType("storage", (nest, name) => storage(nest, name));

function findInStorage(nest, name) {
  return storage(nest, name).then((found) => {
    if (found != null) return found;
    else return findInRemoteStorage(nest, name);
  });
}
function network(nest) {
  return Array.from(nest.state.connections.keys());
}

function findInRemoteStorage(nest, name) {
  let sources = network(nest).filter((n) => {
    return n !== nest.name;
  });
  function next() {
    if (sources.length === 0) {
      return Promise.reject(new Error("Not found"));
    } else {
      let source = sources[Math.floor(Math.random() * sources.length)];
      sources = sources.filter((n) => n != source);
      console.log(nest, source, name);
      return routeRequest(nest, source, "storage", name).then((value) => {
        return value != null ? value : next(), next;
      });
    }
  }
  return next();
}
// setTimeout(() => findInRemoteStorage(churchTower, "enemies"), 2000);

async function findInStorageAsync(nest, name) {
  let local = await storage(nest, name);
  if (local != null) return local;

  let sources = network(nest).filter((n) => n != nest.name);
  while (sources.length > 0) {
    console.log(sources);
    let source = sources[Math.floor(Math.random() * sources.length)];
    sources = sources.filter((n) => n !== source);
    try {
      let found = await routeRequest(nest, source, "storage", name);
      if (found !== null) return found;
    } catch (_) {}
  }
  throw new Error("Not found");
}

function anyStorage(nest, source, name) {
  if (source === nest.name) return storage(nest, name);
  else return routeRequest(nest, source, "storage", name);
}

async function chicksWithAsyncGap(nest, year) {
  let list = "";
  await Promise.all(
    network(nest).map(async (name) => {
      console.log(list);
      list += `${name}: ${await anyStorage(
        nest,
        name,
        `chicks in ${year}`
      )}\n;`;
    })
  );
  return list;
}

async function chicks2(nest, year) {
  const network = await network(nest);
  let lines = network.map(async (name) => {
    return name + ": " + (await anyStorage(nest, name, `chicks in ${year}`));
  });
  console.log(lines);
  return (await Promise.all(lines)).join("\n");
}
// setTimeout(() => chicks(bigOak, 2017).then(console.log), 2000);

/////////////////////////////////////////////////////////////////////////////////////////////////////Tracking The Scalpel/////////////////////////////////////
// Solution by me
async function locateScalpel(nest) {
  const nests = network(nest);
  const scalpelLocation = nests.map(async (name) => {
    return name === (await anyStorage(nest, name, "scalpel"))
      ? "scalpel"
      : "nothing";
  });

  const scalpelPlace = Promise.all(scalpelLocation).then((places) => {
    return nests[places.findIndex((p) => p === "scalpel")];
  });
  return scalpelPlace;
}

function locateScalpel2(nest) {
  const nests = network(nest);
  const isScalpelAtPlace = Promise.resolve(
    nests.map((name) => {
      return Promise.resolve(anyStorage(nest, name, "scalpel")).then((place) =>
        place === name ? true : false
      );
    })
  );

  const scalpelPlace = isScalpelAtPlace.then((places) =>
    Promise.all(places).then((places) => {
      return nests[places.findIndex((p) => p === true)];
    })
  );
  const result = new Promise((resolve, reject) => {
    return scalpelPlace.then((place) => {
      if (place == null || place < 0)
        reject(new Error("Place hasn't been found!"));
      else resolve(scalpelPlace);
    });
  });
  return result;
}
// setTimeout(() => locateScalpel2(bigOak).then(console.log), 2000);

// Solution by Marijn Haverbeke

async function locateScalpelByMH(nest) {
  let current = nest.name;
  for (;;) {
    let next = await anyStorage(nest, current, "scalpel");
    if (next === current) return current;
    current = next;
  }
}

function locateScalpelByMH2(nest) {
  function loop(current) {
    return anyStorage(nest, current, "scalpel").then((next) => {
      if (next === current) return current;
      else return loop(next);
    });
  }
  return loop(nest.name);
}

// locateScalpelByMH(bigOak).then(console.log);
// locateScalpelByMH2(bigOak).then(console.log);

/////////////////////////////////////////////////////////////////////////////////////////////////////Building Promise.all/////////////////////////////////////

function Promise_all_by_me(promises) {
  console.log(promises);
  let resolvedArr = [];
  let countPromises = 0;
  for (let promise of promises) {
    countPromises++;
  }
  return new Promise((resolve, reject) => {
    if (countPromises === 0) {
      return resolve([]);
    }

    for (let promise of promises) {
      console.log(promise);
      setTimeout(
        () =>
          promise
            .then((value) => {
              resolvedArr.push(value);
              // Check if all promises are resolved
              if (resolvedArr.length === countPromises) {
                resolve(resolvedArr);
              }
            })
            // Reject the promise
            .catch((err) => reject(err)),
        501
      );
    }
  });
}

// Solution by MH

function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let pending = promises.length;
    for (let i = 0; i < promises.length; i++) {
      promises[i]
        .then((result) => {
          results[i] = result;
          pending--;
          if (pending === 0) resolve(results);
        })
        .catch(reject);
    }
    if (promises.length === 0) resolve(results);
  });
}

// Test code

Promise_all([]).then((array) => {
  console.log("This should be []:", array);
});

function soon(val) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}

Promise_all([soon(1), soon(2), soon(3)]).then((array) => {
  console.log("This should be [1,2,3]", array);
});

Promise_all([soon(1), Promise.reject("X"), soon(3)])
  .then((array) => {
    console.log("We should not get here");
  })
  .catch((error) => {
    if (error != "X") {
      console.log("Unexpected failure:", error);
    }
  });
