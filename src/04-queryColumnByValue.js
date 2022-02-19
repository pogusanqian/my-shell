const XLSX = require('xlsx');
const { Sequelize, QueryTypes } = require('sequelize');

const sequelize = new Sequelize({
  host: '192.168.124.24',
  username: 'root',
  password: '123123',
  dialect: 'mysql',
  logging: false,
});

/**
 * 获取数据库, 表格, 字段名称等元数据信息
 */
async function getMetaData() {
  const sql = `SELECT table_schema AS schemaNmae, table_name AS tableName, column_name AS columnName
  FROM information_schema.columns 
  WHERE table_schema NOT IN ('information_schema', 'mysql', 'sys', 'performance_schema')`;
  return await sequelize.query(sql, { type: QueryTypes.SELECT });
}

/**
 * 根据value值查找字段名称
 * @param {*} metaData 
 * @param {*} parames 
 * @returns 
 */
async function getColumnByValue(metaData, parames) {
  const dataList = [];
  for ({ schemaNmae, tableName, columnName } of metaData) {
    const sql = `SELECT ${columnName} FROM ${schemaNmae}.${tableName} WHERE ${columnName} LIKE "%${parames}%"`;
    try { // 有个表的字段名称是使用update命名的, 所以捕捉了一下异常
      const res = await sequelize.query(sql, { type: QueryTypes.SELECT });
      if (res.length > 0) dataList.push({ schemaNmae, tableName, columnName, value: res[0][columnName] });
    } catch (err) {
      console.error(err);
    }
  }
  return dataList.length ? dataList : ['没有查找到数据'];
}

/**
 * 下载excle表
 * @param {*} data 
 * @param {*} path 
 */
function downExcle(data, path) {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws);
  XLSX.writeFile(wb, path);
}

(async () => {
  const parames = '172.25.0.4';
  const path = 'D:\\Code\\my-shell\\test\\my.xlsx';
  const meteData = await getMetaData();
  const dataList = await getColumnByValue(meteData, parames);
  downExcle(dataList, path);
})();

