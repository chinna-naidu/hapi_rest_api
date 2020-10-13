const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

module.exports = (filedata, filename) => {
  return new Promise((resolve, reject) => {
    const modifiedFilename =
      crypto.randomBytes(5).toString("hex") + "_" + filename;
    let filepath = path.join(
      __dirname,
      "..",
      "public",
      "images",
      modifiedFilename
    );
    fs.writeFile(filepath, filedata, (error) => {
      if (!error) {
        resolve(`/images/${modifiedFilename}`);
      }
      reject(error);
    });
  });
};
