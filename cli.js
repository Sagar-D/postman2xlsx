#!/usr/bin/env node
let p2xl =  require('.');

let inputFile = process.argv[2];
p2xl.exportToXlsx(inputFile);
