const readline = require('readline');
const fs = require('fs');

const BME280 = require('bme280-sensor');
const basePath = '/tmp/data'
const outputPath = basePath + '/weather.json'
if (!fs.existsSync(basePath)) {
  fs.mkdirSync(basePath);
}

const options = {
  i2cBusNo: BME280_BUS, // defaults to 1
  i2cAddress: BME280_ADDRESS // defaults to 0x77
};
const sensorAltitude = SENSOR_ALTITUDE; //1450;

var seaLevel = function(pressure, altitude) {
  return pressure / Math.pow(1 - (altitude / 44330), 5.255);
};

const bme280 = new BME280(options);

// Read BME280 sensor data and output.
const readSensorData = () => {
  bme280.readSensorData()
    .then((data) => {
      var pressure = seaLevel(data.pressure_hPa * 100, sensorAltitude);
      var blob = {
        "temperature": data.temperature_C,
        "pressure": pressure,
        "humidity": data.humidity
      };

      fs.writeFileSync(outputPath, JSON.stringify(blob));
    })
    .catch((err) => {
      console.log(`BME280 read error: ${err}`);
    });
};

// Initialize the BME280 sensor
bme280.init()
  .then(() => {
    console.log('BME280 initialization succeeded');
    readSensorData();
  })
  .catch((err) => console.error(`BME280 initialization failed: ${err} `));
