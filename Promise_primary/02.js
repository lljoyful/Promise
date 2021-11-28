const fs = require('fs');

// fs.open('./hh.txt');
// fs.readFile('./content/test.txt', (err, data) => {
//   if (err) {
//     return console.error(err);
//   }
//   console.log(data);
// });

// Promise的形式
let p = new Promise((resolve, reject) => {
  fs.readFile('./content/test.txt', (err, data) => {
    if (err) {
      reject(err);
    }
    resolve(data);
  });
});
p.then(
  (data) => {
    console.log('没出错\n' + data);
  },
  (err) => {
    console.log('出错啦!\n' + err);
  }
);
