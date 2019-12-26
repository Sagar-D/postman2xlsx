'use strict';

const fs = require('fs');
const json2xls = require('json2xls');

const readJSON = (filePath) => {
  let rawData = fs.readFileSync(filePath);
  let jsonData = JSON.parse(rawData);
  return jsonData;
}

const getHost = (api) => {

  if(!api.request.url.host)
    return "";

  return api.request.url.host.join('.');
}

const getEndPoint = (api) => {

  if(!api.request.url.path)
    return "";

  return api.request.url.path.join('/');
}

const getRequestParameters = (api) => {

  if(!api.request.url.query)
    return "";

  let params = []
  api.request.url.query.forEach( (obj) => {
    params.push(obj.key+":"+obj.value);
  })
  return params.join("\n");
}

const getRequestHeader = (api) => {

  if(!api.request.header)
    return "";

  let headers = []
  api.request.header.forEach( (obj) => {
    headers.push(obj.key+":"+obj.value);
  })
  return headers.join("\n");

}

const exportToXlsx = (inputFilePath,outputFilePath='output.xlsx') => {
  let collection = readJSON(inputFilePath);

  let data = [];

  collection.item.forEach((apiData) => {
    let lineItem = {}
    lineItem.host = getHost(apiData);
    lineItem.endPoint = getEndPoint(apiData);
    lineItem.request_params = getRequestParameters(apiData);
    //lineItem.request_body = getRequestBody(apiData);
    lineItem.request_headers = getRequestHeader(apiData);

    data.push(lineItem);
  })

  console.log(data)
  writeToXlsx(outputFilePath,data);

}

const writeToXlsx = (filePath,data) => {
  var xlsxData = json2xls(data);
  fs.writeFileSync(filePath, xlsxData, 'binary');
}

exportToXlsx('/Users/user/Downloads/test.json')
