/*
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  .then((result) => {
    console.log(result);
    return result * 2;
  })
  .then((result) => {
    console.log(result);
    return result * 2;
  })
  .then((result) => {
    console.log(result);
    return result * 2;
  });

new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  .then((result) => {
    console.log(result);
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then((result) => {
    console.log(result);
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(console.log);
*/

/*
// Loading scripts one by one
function loadScript(src) {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));

    document.head.append(script);
  });
}

loadScript("./javascriptInfoPromises/script.js")
  .then((script) => loadScript("./javascriptInfoPromises/script2.js"))
  .then((script) => {
    fnOne();
    fnTwo();
  });
*/

/*
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    console.log(resolve);
    setTimeout(() => resolve(this.num * 2), 1000);
  }
}

new Promise((resolve) => resolve(1))
  .then((result) => {
    return new Thenable(result);
  })
  .then(console.log);
*/

// Fetching data
/*
fetch("./javascriptInfoPromises/user.json")
  // Load it as json
  .then((response) => response.json())
  //Make a request to GitHub
  .then((user) => fetch(`https://api.github.com/users/${user.name}`))
  // load the response as json
  .then((response) => response.json())
  .then((githubUser) => {
    return new Promise((resolve, reject) => {
      let img = document.createElement("img");
      img.src = githubUser.avatar_url;
      img.className = "promise-avatar-example";
      document.body.append(img);

      setTimeout(() => {
        img.remove();
        resolve(githubUser);
      }, 5000);
    });
  })
  .then((githubUser) => console.log(githubUser));
*/
// Spliting code to reusable functions.

function loadJson(url) {
  return fetch(url).then((response) => response.json());
}

function loadGithubUser(name) {
  return loadJson(`https://api.github.com/users/${name}`);
}

function showAvatar(githubUser) {
  return new Promise((resolve, reject) => {
    let img = document.createElement("img");
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 5000);
  });
}

loadJson("./javascriptInfoPromises/user.json")
  .then((user) => loadGithubUser(user.name))
  .then(showAvatar);
