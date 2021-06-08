// 中文标点符号映射成英文
const fs = require('fs');
const minimist = require('minimist');

const argv = minimist(process.argv.slice(2), {
  default: {
    path: 'C:\\Users\\pogus\\Documents\\GreenSoft\\todyStudy.txt'
  }
})

const replaceConfigMap = new Map([
  ['，', ', '],
  ['。', '; '],
  ['？', '? '],
  ['、', ', '],
  ['：', ': '],
  ['”', '"'],
  ['（', '('],
  ['）', ')'],
]);
const path = argv.path;

let result = fs.readFileSync(path, 'utf8');
replaceConfigMap.forEach((value, key) => result = result.replace(new RegExp(key, 'g'), value));
console.log(result);
fs.writeFileSync(path, result);
