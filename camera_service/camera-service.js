var RaspiCam = require("raspicam");
const fs = require('fs');
const minLight = 1;

const basePath = '/tmp/photos'
var now = Date.now() / 1000;
var filename = now.toFixed(0).toString() + '.jpg';
var filePath = basePath + "/" + filename;

const lightPath = '/tmp/data/light.json';
var light;
var lightAvailable = false;
console.log("reading the light level");
try {
  var content = fs.readFileSync(lightPath);
  var jsonContent = JSON.parse(contents);
  if (jsonContent.hasOwnProperty('light')) {
    light = jsonContent.light;
    lightAvailable = true;
  }
} catch (e) {
  console.log("reading light exception: " + e);
}

if (!lightAvailable) {
  console.log("light not available");
}

if (!lightAvailable || light > minLight) {
  console.log("creating: " + filePath);
  // Camera setup.
  var camera = new RaspiCam({
    mode: 'photo',
    output: filePath,
    width: 2592 / DIVIDER, // 2
    height: 1944 / DIVIDER, // 2
    quality: QUALITY, //50
    encoding: 'jpg'
  });

  camera.on("read", function(err, timestamp, fn) {
    if (fn === filename) {
      console.log("new image: " + fn);
      camera.stop();
      console.log("camera stopped");
    }
  });

  camera.start();
} else {
  console.log("light not available: " + light);
}
