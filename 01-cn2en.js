// 中文标点符号映射成英文
const fs = require('fs');
const minimist = require('minimist');
const { exec } = require('child_process');
const iconv = require('iconv-lite');

const argv = minimist(process.argv.slice(2), {
  default: {
    path: 'D:/GWare/TodyStudy.txt'
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

// 输出到控制台, 并更改文件, 并复制到剪切板上, 注意复制到剪切板的字符编码一定要是GBK编码
console.log(result);
fs.writeFileSync(path, result);
exec('clip').stdin.end(iconv.encode(result, 'gbk'));
