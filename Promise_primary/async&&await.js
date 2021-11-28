const fs = require('fs');
const util = require('util');
const mineReadFile = util.promisify(fs.readFile);
//回调函数
/* fs.readFile('./Promise_primary/content/test.txt', (err, data1) => {
  if (err) throw err;
  fs.readFile('./Promise_primary/content/test1.txt', (err, data2) => {
    if (err) throw err;
    fs.readFile('./Promise_primary/content/test2.txt', (err, data3) => {
      if (err) throw err;
      console.log(data1 + data2 + data3);
    });
  });
}); */
//async&&await
async function main() {
  try {
    let data1 = await mineReadFile('./Promise_primary/content/test.txt');
    let data2 = await mineReadFile('./Promise_primary/content/test1.txt');
    let data3 = await mineReadFile('./Promise_primary/content/test2.txt');
    console.log(data1 + data2 + data3);
  } catch (e) {
    console.log(e);
  }
}
main();
