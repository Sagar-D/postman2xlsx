'use strict';

const fs = require('fs');

const readJSON = (filePath) => {
  let rawData = fs.readFileSync(filePath);
  let jsonData = JSON.parse(rawData);
  return jsonData;
}

const exportToXlsx = (filePath) => {
  let collection = readJSON(filePath);
  console.log(collection);
}

exportToExcel('/Users/user/Downloads/test.json')
