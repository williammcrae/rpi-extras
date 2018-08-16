const fs = require('fs');
const http = require('http');
const https = require('https');
const os = require('os');
const fs = require('fs');

var RaspiCam = require("raspicam");

const configPath = '/usr/local/config/service.json';
const watchdogPath = '/tmp/send-to-service';

var serviceHost;
var servicePort;
var connect;
var serviceUUID;
var serviceToken;

console.log("reading config");
try {
  var content = fs.readFileSync(configPath);
  var jsonContent = JSON.parse(content);
  serviceHost = jsonContent.host;
  servicePort = jsonContent.port;
  connect = jsonContent.protocol == 'https' ? https : http;
  serviceUUID = jsonContent.uuid;
  serviceToken = jsonContent.token;
} catch (e) {
  console.log("failure reading configuration " + e);
  process.exit(1);
}

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

// Push photos
var photoFiles = fs.readdirSync(basePath);

photoFiles.forEach(function(val, index, array) {
  if (val.endsWith('.jpg')) {
    console.log("handle photo: " + val);
    var filePath = basePath + val;
    var options = {
      hostname: serviceHost,
      port: servicePort,
      path: '/api/v0/' + serviceUUID + '/file/camera',
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpeg',
        'service-token': serviceToken
      }
    };
    var taken = val.substring(0, val.length - 4);
    if (taken.length) {
      options.headers['service-taken'] = taken;
    }

    var imageStream = fs.createReadStream(filePath, {
      encoding: null,
      autoClose: true
    });

    var req = connect.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('No more data in response.')
      })
    });

    req.on('error', (e) => {
      console.log("error on photo: " + val);
      console.log(`problem with request: ${e.message}`);
    });

    imageStream.on('end', function() {
      console.log("sent photo: " + val);
      console.log('end of stream');
      req.end();
    });

    imageStream.pipe(req);

    // Remove the file.
    fs.unlinkSync(filePath);
    console.log("removed photo: " + val);
  }
});
