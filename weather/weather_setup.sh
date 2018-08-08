#!/bin/bash

cp /boot/PiBakery/blocks/weather/weather.cron /etc/cron.d/weather

mkdir -p /usr/local/weather
mkdir -p /usr/local/weather/node_modules
sed s/BME280_BUS/$1/ < /boot/PiBakery/blocks/weather/weather.js > /usr/local/weather/weather.js
sed s/BME280_ADDRESS/$2/ < /usr/local/weather/weather.js > /tmp/weather.js
sed s/SENSOR_ALTITUDE/$3/ < /tmp/weather.js > /usr/local/weather/weather.js

cd /usr/local/weather
chmod a+w /usr/local/weather/node_modules
yes "" | su pi -c 'npm install bme280-sensor'
chmod a-w /usr/local/weather/node_modules
