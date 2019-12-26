'use strict';

const fs = require('fs');

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

const exportToXlsx = (filePath) => {
  let collection = readJSON(filePath);

  let data = [];

  collection.item.forEach((apiData) => {
    let lineItem = {}
    lineItem.host = getHost(apiData);
    lineItem.endPoint = getEndPoint(apiData);
    lineItem.request_params = getRequestParameters(apiData);
    //lineItem.request_body = getRequestBody(apiData);
    //lineItem.request_headers = getRequestHeader(apiData);

    data.push(lineItem);
  })

  console.log(data)

}

exportToXlsx('/Users/user/Downloads/test.json')
