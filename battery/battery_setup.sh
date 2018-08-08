#!/bin/bash

cp /boot/PiBakery/blocks/battery/battery.cron /etc/cron.d/battery

mkdir -p /usr/local/battery
mkdir -p /usr/local/battery/node_modules
cp /boot/PiBakery/blocks/battery/battery.js /usr/local/battery/battery.js

cd /usr/local/battery
chmod a+w /usr/local/battery/node_modules
yes "" | su pi -c 'npm install node-ads1x15'
chmod a-w /usr/local/battery/node_modules
