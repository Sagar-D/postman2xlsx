# PostmanToXlsx
Export Request details from postman collection json to xlsx file.

## Install using npm
`npm install postman2xlsx`

## Command Line Execution
``` npm run postmanToXlsx '<path to postman-api-collection.json>' ```

## Import As Module In Node.js

```
'use strict';

const p2xl = require('postman2xlsx');

let postmanCollectionPath = 'path to postman-api-collection.json';

// Output file will be written in the same folder as that of input file with fileName as postmanToXslxOutput.xlsx
p2xl.exportToXlsx(postmanCollectionPath);

//Can also pass a secondary argument as output file path
let outputFilePath = '<path>/myOutputFile.xlsx';
p2xl.exportToXlsx(postmanCollectionPath, outputFilePath);

```

--------------------------------------------------------------------------------------------------------------------------
## Steps to Export Collections from Postman
[Learn to Export Collections from Postman](https://learning.getpostman.com/docs/postman/collections/data-formats/#exporting-postman-data)

