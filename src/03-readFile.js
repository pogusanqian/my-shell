const fs = require('fs');
const path = require('path');

function readNames(pathLocation) {
  const dirInfo = fs.readdirSync(pathLocation, {
    withFileTypes: true,
  });
  // 采用递归方式, 如果是目录就继续调用此方法
  dirInfo.forEach((item) => {
    const location = path.join(pathLocation, item.name);
    item.isFile() ? fileNameArr.push(location) : readNames(location);
  });
}

// 读取目录下的文件
const fileNameArr = [];
const filePath = "D:/Code/my-shell";
readNames(filePath);

// 输出到目录和控制台
console.log(fileNameArr.join("\n"));
fs.writeFileSync("D:/Code/my-shell/test/files.txt", fileNameArr.join("\n"));