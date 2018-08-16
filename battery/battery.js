const readline = require('readline');
const fs = require('fs');

var ADS1115 = require('node-ads1x15');
const basePath = '/tmp/data'
const outputPath = basePath + '/battery.json'
if (!fs.existsSync(basePath)) {
  fs.mkdirSync(basePath);
}

var ads1115 = new ADS1115(1);
if (!ads1115.busy) {
  ads1115.readADCDifferential(0, 1, '4096', '16', function(err, data) {
    var battery;
    if (err) {
      console.log("ads1115 err: " + err);
      battery = -1;
    } else {
      battery = data / 1000;
    }
    console.log("data: " + data);
    console.log("battery: " + battery);
    var blob = {
      'battery': battery
    };
    fs.writeFileSync(outputPath, JSON.stringify(blob));
  });
} else {
  console.log("ads1115 is busy");
  var blob = {
    'battery': -1
  };
  fs.writeFileSync(outputPath, JSON.stringify(blob));
}
