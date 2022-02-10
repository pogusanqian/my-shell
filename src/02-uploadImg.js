const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

const url = '*********';
// 获取Cookie
const Cookie = fs.readFileSync('D:/Code/my-shell/cookie.txt');

(async () => {
  // 填充form表单数据, process.argv[2]获取了Typora传递过来图片路径字符串
  const data = new FormData();
  data.append('img', fs.createReadStream(process.argv[2]));

  // 上传数据
  const res = await axios({
    url,
    data,
    method: 'post',
    headers: { Cookie , ...data.getHeaders()},
  });

  // 返回上传的路径给typora
  console.log(res.data.url);
})();