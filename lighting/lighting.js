const readline = require('readline');
const fs = require('fs');

var BH1750 = require('bh1750');
const basePath = '/tmp/data'
const outputPath = basePath + '/light.json'
if (!fs.existsSync(basePath)) {
  fs.mkdirSync(basePath);
}

var bh1750 = new BH1750({
  address: BH1750_ADDRESS, // 0x23,
  device: '/dev/i2c-BH1750_BUS', // '/dev/i2c-0',
  command: 0x11,
  length: 2
});

bh1750.readLight(function(status, value) {
  console.log("status: " + status);
  console.log("value: " + value);
  var blob = {
    'light': value
  };
  fs.writeFileSync(outputPath, JSON.stringify(blob));
});
