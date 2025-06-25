// const fs = require("fs"); - старый подход, работающий через callback'и
const fs = require("fs/promises"); // - тот же самый функционал, построенный на promise'ах
const fsSync = require("fs");
const path = require("path");

const base = path.join(__dirname, "temp");

const getContent = () => `
\n${process.argv[2] ?? ""}
`;

async function start() {
  try {
    if (fsSync.existsSync(base)) {
      await fs.appendFile(path.join(base, "logs.txt"), getContent());
      const data = await fs.readFile(path.join(base, "logs.txt"), {
        encoding: "utf-8",
      });
      console.log(data);
    } else {
      await fs.mkdir(base);
      await fs.writeFile(path.join(base, "logs.txt"), process.argv[2] ?? "");
    }
  } catch (err) {
    console.log(err);
  }
}

start();

// fs.mkdir(base)
//   .then(() => {
//     console.log("folder created");
//   })
//   .catch((err) => console.log(err));
