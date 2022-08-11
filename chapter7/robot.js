// page 129
"use strict";
const mailRoute = [
  "Alice's House",
  "Cabin",
  "Alice's House",
  "Bob's House",
  "Town Hall",
  "Daria's House",
  "Ernie's House",
  "Grete's House",
  "Shop",
  "Grete's House",
  "Farm",
  "Marketplace",
  "Post Office",
];
const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall",
];

function buildGraph(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map((r) => r.split("-"))) {
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}

const roadGraph = buildGraph(roads);

class VillageState {
  constructor(place, parcels) {
    this.place = place;
    this.parcels = parcels;
  }
  move(destination) {
    if (!roadGraph[this.place].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels
        .map((p) => {
          if (p.place !== this.place) return p;
          return { place: destination, address: p.address };
        })
        .filter((p) => p.place !== p.address);
      return new VillageState(destination, parcels);
    }
  }
}

function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length === 0) {
      // Removed final message and return total turn quantity
      // console.log(`Done in ${turn} turns`);
      return turn;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
}
//([T]) -> T
function randomPick(array) {
  let choice = Math.floor(Math.random() * array.length);
  return array[choice];
}

function randomRobot(state) {
  return { direction: randomPick(roadGraph[state.place]) };
}

VillageState.random = function (parcelCount = 5) {
  let parcels = [];
  for (let i = 0; i < parcelCount; i++) {
    let address = randomPick(Object.keys(roadGraph));
    let place;
    do {
      place = randomPick(Object.keys(roadGraph));
    } while (place === address);
    {
      parcels.push({ place, address });
    }
  }
  return new VillageState("Post Office", parcels);
};

function routeRobot(state, memory) {
  if (memory.length === 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}

function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      if (place === to) {
        return route.concat(place);
      }

      if (!work.some((w) => w.at === place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}

// (VillageState, Array) -> { direction: string, memory: Array}
function goalOrientedRobot({ place, parcels }, route) {
  if (route.length === 0) {
    let parcel = parcels[0];
    if (parcel.place !== place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}
const myVillage = {
  place: "Post Office",
  parcels: [
    { place: "Post Office", address: "Post Office" },
    { place: "Post Office", address: "Post Office" },
  ],
};

function myRobot({ place, parcels }, route) {
  if (route.length === 0) {
    // Find closest parcels place from all parcels if parcel is not taken
    let toClosestParcel = findOptimalRoute(
      parcels.filter((p) => p.place !== place),
      place,
      false
    );
    // Find closest delivery address if Postman has parcel
    let toClosestDeliveryAddress = findOptimalRoute(
      parcels.filter((p) => p.place === place),
      place
    );
    // Postman has parcels and delivery addresses. Find closest route. Priotrity is to take closest parcel.
    if (toClosestDeliveryAddress && toClosestParcel) {
      route =
        toClosestParcel.length <= toClosestDeliveryAddress.length
          ? toClosestParcel
          : toClosestDeliveryAddress;
      // Postman took all parcels and delivers closest one.
    } else if (!toClosestParcel && toClosestDeliveryAddress) {
      route = toClosestDeliveryAddress;
      // Postman doesn't have a parcel and moves to closest one.
    } else if (toClosestParcel && !toClosestDeliveryAddress) {
      route = toClosestParcel;
    }
  }
  return { direction: route[0], memory: route.slice(1) };
}
function findOptimalRoute(parcels, place, delivery = true) {
  return parcels.reduce((p1, p2, index, array) => {
    let optimalRoute =
      findRoute(roadGraph, place, p1[delivery ? "address" : "place"]).length <=
      findRoute(roadGraph, place, p2[delivery ? "address" : "place"]).length
        ? p1
        : p2;
    if (index === array.length - 1) {
      optimalRoute = findRoute(
        roadGraph,
        place,
        optimalRoute[delivery ? "address" : "place"]
      );
    }
    return optimalRoute;
  }, parcels[0]);
}

function compareRobots(robot1, memory1, robot2, memory2) {
  const TASKS = 100;
  let turns1 = 0;
  let turns2 = 0;
  for (let i = 0; i < TASKS; i++) {
    let state = VillageState.random();
    turns1 += runRobot(state, robot1, memory1);
    turns2 += runRobot(state, robot2, memory2);
  }
  let averRobotTurns1 = turns1 / TASKS;
  let averRobotTurns2 = turns2 / TASKS;
  console.log(averRobotTurns1, averRobotTurns2);
}

// Solution of ex. 7.1 by Marijn Haverbeke
function countSteps(state, robot, memory) {
  for (let steps = 0; ; steps++) {
    if (state.parcels.length === 0) {
      return steps;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
  }
}

function compareRobotsBYMH(robot1, memory1, robot2, memory2) {
  let total1 = 0,
    total2 = 0;
  for (let i = 0; i < 100; i++) {
    let state = VillageState.random();
    total1 += countSteps(state, robot1, memory1);
    total2 += countSteps(state, robot2, memory2);
  }
  console.log(`Robot 1 needed ${total1 / 100} steps per task`);
  console.log(`Robot 2 needed ${total2 / 100} steps per task`);
}

// Solution of ex. 7.2 by Marijn Haverbeke
function lazyRobot({ place, parcels }, route) {
  if (route.length == 0) {
    // Describe a route for every parcel
    let routes = parcels.map((parcel) => {
      if (parcel.place != place) {
        return {
          route: findRoute(roadGraph, place, parcel.place),
          pickUp: true,
        };
      } else {
        return {
          route: findRoute(roadGraph, place, parcel.address),
          pickUp: false,
        };
      }
    });

    // This determines the precedence a route gets when choosing.
    // Route length counts negatively, routes that pick up a package
    // get a small bonus.
    function score({ route, pickUp }) {
      return (pickUp ? 0.5 : 0) - route.length;
    }
    route = routes.reduce((a, b) => (score(a) > score(b) ? a : b)).route;
  }

  return { direction: route[0], memory: route.slice(1) };
}

// Run as postman
// runRobot(VillageState.random(), routeRobot, []);

// Randoom run
// runRobot(VillageState.random(), randomRobot);

// Goal  Oriented Robot
// runRobot(VillageState.random(), goalOrientedRobot, []);

// My robot
// runRobot(VillageState.random(5), myRobot, []);

// Lazy robot
// runRobot(VillageState.random(), lazyRobot, []);

// Compare Robots
// compareRobotsBYMH(myRobot, [], lazyRobot, []);
