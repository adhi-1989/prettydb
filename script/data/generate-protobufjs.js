/* eslint-disable @typescript-eslint/no-var-requires */
const childProcess = require("child_process");
const fs = require("fs");
const path = require("path");
const util = require("util");
/* eslint-enable @typescript-eslint/no-var-requires */

console.log("Generate protobuf.js for data");

const protoDir = "proto/data";
const files = fs
  .readdirSync(protoDir)
  .filter((x) => x.endsWith(".proto"))
  .map((x) => path.resolve(protoDir, x));

files.forEach((x) => {
  console.log(`bundle: ${x}`);
});

const paths = files.join(" ");
const jsFile = "src/data/_protobuf.js";
const tsFile = "src/data/_protobuf.d.ts";
const pbjs = `pbjs -t static-module --no-create --no-encode --no-verify --no-convert --no-delimited -w es6 --es6 -o ${jsFile} ${paths}`;
const pbts = `pbts -o ${tsFile} ${jsFile}`;

const exec = util.promisify(childProcess.exec);

console.log(`Try generate file: ${jsFile}`);

exec(pbjs)
  .then(({ stderr }) => {
    if (stderr) return Promise.reject(stderr);
    return exec(pbts).then(({ stderr }) => {
      if (stderr) return Promise.reject(stderr);
      return Promise.resolve(`Success file generate: ${jsFile}`);
    });
  })
  .then((value) => {
    console.log(value);
    process.exit();
  })
  .catch((reason) => {
    console.error(reason);
    process.exit(1);
  });
