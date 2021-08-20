const fs = require('fs');
const path = require('path');

//异步串行，深度优先，不断遍历子文件夹，通过计数器判断文件删除完毕之后删除自身文件夹
function myRm(file, callBack) {
  fs.stat(file, (err, stat) => {
    if (stat.isFile()) {
      fs.unlink(file, callBack);
    } else {
      fs.readdir(file, (err, dirs) => {
        dirs = dirs.map((d) => path.join(file, d));
        let index = 0;
        function next() {
          if (index === dirs.length) return fs.rmdir(file, callBack);
          current = dirs[index++];
          myRm(current, next);
        }
        next();
      });
    }
  });
}
// myRm('a', () => console.log('remove success'));

// 异步串行 广度优先, 先广度遍历全部的文件夹，再倒序依次执行删除操作
function myRm2(dir, cb) {
  let stack = [dir];
  function removeDirs() {
    let idx = stack.length - 1;
    console.log(stack)
    function next() {
      if (idx < 0) return cb();
      fs.rmdir(stack[idx--], next);
    }
    next();
  }
  let index = 0;
  function nextTraversal() {
    const current = stack[index++];
    if (!current) return removeDirs();
    fs.stat(current, (err, stat) => {
      if (stat.isFile()) {
        fs.unlink(current, nextTraversal);
      } else {
        fs.readdir(current, (err, dirs) => {
          dirs = dirs.map((d) => path.join(current, d));
          stack.push(...dirs);
          nextTraversal();
        });
      }
    });
  }
  nextTraversal();
}

myRm2('a', () => console.log('remove success'));
