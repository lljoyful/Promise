// 封装一个函数mineReadFile 读取文件内容
function mineReadFile(path) {
  return new Promise((resolve, reject) => {
    require('fs').readFile(path, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

mineReadFile('./content/test.txt').then(
  (data) => {
    console.log(data.toString());
  },
  (err) => {
    console.log(err);
  }
);
