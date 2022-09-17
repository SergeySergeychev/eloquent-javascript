/*
async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done"), 1000);
  });

  let result = await promise;
  console.log(result);
}

async function showAvatar() {
  // read JSON
  let response = await fetch("./javascriptInfoPromises/user.json");
  let user = await response.json();

  // read github user
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // show the avatar
  let img = document.createElement("img");
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // wait  3 seconds

  await new Promise((resolve, reject) => setTimeout(resolve, 3000));
  img.remove();

  return githubUser;
}

// wrap async to allow top-level await
(async () => {
  let response = await fetch("./javascriptInfoPromises/user.json");
  let user = await response.json();

  console.log(user.name);
})();

// async with Thenable objects

class Thenable {
  constructor(num) {
    this.num = num;
  }

  then(resolve, reject) {
    setTimeout(() => resolve(this.num * 2), 1000);
  }
}

(async () => {
  // waits 1 second and result becomes 4
  let result = await new Thenable(2);
  console.log(result);
})();

class Waiter {
  async wait() {
    return await Promise.resolve(1);
  }
}

new Waiter().wait().then(console.log);

(async () => {
  try {
    let response = await fetch("./new-year-is-coming-?");
    let newYear = await response.json();
  } catch (err) {
    // catches errors both i fetch and response.json()
    console.log(err);
  }
})();

*/
/*
// ex. Rewrite using async/await

async function loadJson(url) {
  let response = await fetch(url);

  if (response.status === 200) {
    let json = await response.json();
    return json;
  }

  throw new Error(response.status);
}
loadJson("https://javascript.info/no-such-user.json").catch(console.log);
*/
// ex. Rewrite "rethrow" with async/await

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}

async function loadJson(url) {
  let response = await fetch(url);
  if (response.status === 200) {
    let json = response.json();
    return json;
  }

  throw new HttpError(response);
}

async function demoGithubUser(entryUserName) {
  let name = entryUserName;
  try {
    let user = await loadJson(`https://api.github.com/users/${name}`);
    console.log(`Full name: ${user.name}`);
    return user;
  } catch (err) {
    console.log(err);
    if (err instanceof HttpError && err.response.status === 404) {
      console.log("No such user, please reenter");
    } else {
      throw err;
    }
  }
}

async function wait() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return 10;
}

(() => {
  let ten = wait().then((value) => value);
  console.log(ten);
})();
