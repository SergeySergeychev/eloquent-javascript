const { stat, mkdir } = require("node:fs/promises");
const { join } = require("node:path");

async function makeDirectory() {
  const dir = process.argv[2];
  const stats = await stat(dir);
  try {
    const projectFolder = join(__dirname, process.argv[2]);
    const dirCreation = await mkdir(projectFolder, { recursive: false });
  } catch (error) {
    if (error.code === "EEXIST" && stats.isDirectory()) {
      throw new Error(`${error.code}: Status 204: directory already exist.`);
    } else {
      throw new Error(`${error.code}: Status 400: bad request`);
    }
  }
}
makeDirectory().catch(console.error);
