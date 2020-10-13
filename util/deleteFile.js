const fs = require("fs");
const path = require("path");

module.exports = (image) => {
  fs.unlink(path.join(__dirname, "..", "public", image), (err) => {
    if (!err) {
      console.log(`deleted ${image}`);
    } else {
      console.log(err);
    }
  });
};
