#!/usr/bin/env node
var fs = require('fs');
var path = require('path');

var outFile = require('../package.json').types;
var dtsPath = path.resolve(__dirname, "../", outFile);
var content = fs.readFileSync(dtsPath, 'utf8');
content = content.replace(/pixi_tween/g, 'PIXI.tween');
fs.writeFileSync(dtsPath, content);