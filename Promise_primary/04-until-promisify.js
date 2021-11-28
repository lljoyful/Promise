const util = require('util');
const fs = require('fs');
let mineReadFile = util.promisify(fs.readFile);
mineReadFile('./content/test.txt').then(
  (value) => {
    console.log(value.toString());
  },
  (err) => {
    console.log(err);
  }
);
