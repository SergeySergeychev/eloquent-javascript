Promise.all([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)),
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
]).then(console.log);

let urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://api.github.com/users/jeresig",
];

// map every url to the promise of the fetch
let requests = urls.map((url) => fetch(url));

// Promise.all waits until all jobs are resolved

Promise.all(requests).then((responses) =>
  responses.forEach((response) =>
    console.log(`${response.url}: ${response.status}`)
  )
);

let names = ["iliakan", "remy", "jeresig"];

let requests2 = names.map((name) =>
  fetch(`https://api.github.com/users/${name}`)
);

Promise.all(requests2)
  .then((responses) => {
    for (let response of responses) {
      console.log(`${response.url}: ${response.status}`);
    }
    return responses;
    // Map array of responses into an array of response.json() to read their content
  })
  .then((responses) => Promise.all(responses.map((r) => r.json())))
  // All JSON answers are parsed: "users" is the array of them
  .then((users) => users.forEach((user) => console.log(user.name)));

// If any of the promises is rejected, the promise returned by Promise.all immediately rejects with that error.

Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1500)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 2000)
  ),
]);

let urls2 = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://no-such-url",
];

Promise.allSettled(urls2.map((url) => fetch(url))).then((results) => {
  results.forEach((result, num) => {
    if (result.status === "fulfilled") {
      console.log(`${urls[num]}: ${result.value.status}`);
    }
    if (result.status === "rejected") {
      console.log(`${urls[num]}: ${result.reason}`);
    }
  });
});

// Polyfill Promise.allSettled

if (!Promise.allSettled) {
  const rejectHandler = (reason) => ({ status: "rejected", reason });
  const resolvedHandler = (value) => ({ status: "fulfilled", value });

  Promise.allSettled = function (promises) {
    const convertedPromises = promises.map((p) =>
      Promise.resolve(p).then(resolvedHandler, rejectHandler)
    );
    return Promise.all(convertedPromises);
  };
}

Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 4000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 2000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 1000)),
]).then(console.log); // 1

Promise.any([
  new Promise(
    (resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000),
    setTimeout(() => reject(new Error("Whoops!")), 1000),
    setTimeout(() => reject(new Error("Whoops!")), 1000)
  ),
]).catch((error) => console.log(error));

let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url));
  }

  return fetch(url)
    .then((response) => response.text())
    .then((text) => {
      cache.set(url, text);
      return text;
    });
}

loadCached(urls2[0]);
