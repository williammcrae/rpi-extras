const http = require('http');
const https = require('https');
const os = require('os');

const configPath = '/usr/local/config/service.json';

var serviceHost;
var servicePort;
var connect;
var serviceUUID;
var serviceToken;

console.log("reading config");
try {
  var content = fs.readFileSync(configPath);
  var jsonContent = JSON.parse(contents);
  serviceHost = jsonContent.host;
  servicePort = jsonContent.port;
  connect = jsonContent.protocol;
  serviceUUID = jsonContent.uuid;
  serviceToken = jsonContent.token;
} catch (e) {
  console.log("failure reading configuration " + e);
  process.exit(1);
}

// Push photos
var photoFiles = fs.readdirSync('/tmp/photos');
photoFiles.forEach(function(filePath, index, array) {
  if (val.endsWith('.jpg')) {
    console.log("handle photo: " + val);
    var filePath = "/tmp/photos/" + val;
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

// Push data
var dataFiles = fs.readdirSync('/tmp/data');
var data = false;
dataFiles.forEach(function(filePath, index, array) {
  if (val.endsWith('.json')) {
    console.log("handle data: " + val);
    var filePath = "/tmp/data/" + val;

    try {
      var content = fs.readFileSync(filePath);
      var jsonContent = JSON.parse(contents);

      for (var property in jsonContent) {
        if (object.hasOwnProperty(property)) {
          if (data === false) {
            data = {}
          }
          data[property] = jsonContent[property];
        }
      }
    } catch (e) {
      console.log("failure reading data: " + filePath + " -" + e);
    }

    // Remove the file.
    fs.unlinkSync(filePath);
    console.log("removed data: " + val);
  }
});

if (data !== false) {
  console.log("sending data: " + JSON.stringify([data]));
  var date = new Date();
  data["taken"] = date.toISOString();
  var postData = JSON.stringify([data]);
  var options = {
    hostname: serviceHost,
    port: servicePort,
    path: '/api/v0/' + serviceUUID + '/value',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'service-token': serviceToken
    }
  };

  var req = connect.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`);
    });
    res.on('end', () => {
      console.log('No more data in response.')
        // Touch the watchdog file.
      var fd = fs.openSync(watchdogPath, 'w');
      fs.closeSync(fd);
    })
  });

  req.on('error', (e) => {
    console.log("error sending data");
    console.log(`problem with request: ${e.message}`);
  });

  // write data to request body
  req.write(postData);
  req.end();
}
