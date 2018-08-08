const readline = require('readline');
const fs = require('fs');

var ADS1115 = require('node-ads1x15');
const basePath = '/tmp/data'
const outputPath = basePath + '/battery.json'
if (!fs.existsSync(basePath)) {
  fs.mkdirSync(basePath);
}

var ads1115 = new ADS1115(1);
var battery;
if (!ads1115.busy) {
  ads1115.readADCSingleEnded(0, '4096', '250', function(err, data) {
    if (err) {
      console.log("ads1115 err: " + err);
      battery = -1;
    }
    battery = data / 1000 * 4400000 / 1000000;
  });
} else {
  console.log("ads1115 is busy");
  battery = -1;
}

console.log("battery: " + battery);
var blob = {
  'battery': battery
};
fs.writeFileSync(outputPath, JSON.stringify(blob));
