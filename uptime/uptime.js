const readline = require('readline');
const fs = require('fs');
const os = require('os');

const basePath = '/tmp/data'
const outputPath = basePath + '/uptime.json'
if (!fs.existsSync(basePath)) {
  fs.mkdirSync(basePath);
}

var uptime = os.uptime();
var date = new Date();

var blob = {
  "uptime": uptime
};

fs.writeFileSync(outputPath, JSON.stringify(blob));
