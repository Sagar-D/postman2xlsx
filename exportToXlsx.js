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

const getRequestBody = (api) => {

  if(!api.request.body)
    return "";

  if(api.request.body.mode == "raw")
    return api.request.body.raw;

  if(api.request.body.mode == "formdata" || api.request.body.mode  == "urlencoded"){

    let mode = api.request.body.mode
    let body = []
    api.request.body[mode].forEach( (obj) => {
      body.push(obj.key+":"+obj.value);
    })
    return body.join("\n");
  }

  return ""

}

const exportToXlsx = (inputFilePath,outputFilePath) => {

  if(outputFilePath==undefined)
    outputFilePath = inputFilePath.substring(0,inputFilePath.lastIndexOf('/')+1) + 'postmanToXslxOutput.xlsx';

  let collection = readJSON(inputFilePath);

  let data = [];

  collection.item.forEach((apiData) => {
    let lineItem = {}
    lineItem.host = getHost(apiData);
    lineItem.endPoint = getEndPoint(apiData);
    lineItem.request_params = getRequestParameters(apiData);
    lineItem.request_body = getRequestBody(apiData);
    lineItem.request_headers = getRequestHeader(apiData);

    data.push(lineItem);
  })

  writeToXlsx(outputFilePath,data);
  console.log('Exported Collection from '+inputFilePath+" to Excel located at "+outputFilePath);
}

const writeToXlsx = (filePath,data) => {
  var xlsxData = json2xls(data);
  fs.writeFileSync(filePath, xlsxData, 'binary');
}

module.exports.exportToXlsx = exportToXlsx;
