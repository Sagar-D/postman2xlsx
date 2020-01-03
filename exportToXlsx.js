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

  let data = fetchData(collection.item);

  writeToXlsx(outputFilePath,data);
  console.log('ExpoexportToXlsx.jsrted Collection from '+inputFilePath+" to Excel located at "+outputFilePath);
}

const fetchData = (itemArray) => {

  let data = []

  itemArray.forEach((obj) => {
    if(obj.item){
      let childData = fetchData(obj.item);
      data = data.concat(childData);
    }
    else {
      let lineItem = {}
      lineItem.host = getHost(obj);
      lineItem.endPoint = getEndPoint(obj);
      lineItem.request_params = getRequestParameters(obj);
      lineItem.request_body = getRequestBody(obj);
      lineItem.request_headers = getRequestHeader(obj);
      data.push(lineItem);
    }
  })

  return data;

}

const writeToXlsx = (filePath,data) => {
  var xlsxData = json2xls(data);
  fs.writeFileSync(filePath, xlsxData, 'binary');
}

module.exports.exportToXlsx = exportToXlsx;
