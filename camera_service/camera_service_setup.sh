#!/bin/bash

mkdir -p /usr/local/camera_service
mkdir -p /usr/local/camera_service/node_modules
sed s/QUALITY/$2/ < /boot/PiBakery/blocks/camera_service/camera-service.js  > /tmp/camera-service.js
sed s/DIVIDER/$3/ < /tmp/camera-service.js  > /usr/local/camera_service/camera-service.js

cd /usr/local/camera_service
npm install raspicam

sed s/MINUTES/$1/ < /boot/PiBakery/blocks/camera_service/camera.cron > /etc/cron.d/camera
