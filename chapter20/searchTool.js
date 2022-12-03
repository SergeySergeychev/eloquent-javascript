const { readdir, readFile, stat } = require("node:fs/promises");

const searchPhrase = RegExp(process.argv[2]);

async function search(file) {
  const stats = await stat(file);

  if (stats.isDirectory()) {
    readdir(file).then((dir) => {
      for (let f of dir) {
        search(file + "/" + f);
      }
    });
  } else {
    readFile(file, "utf8").then((fileText) => {
      if (searchPhrase.test(fileText)) console.log(file);
    });
  }
}

for (let argv of process.argv.slice(3)) {
  search(argv);
}
