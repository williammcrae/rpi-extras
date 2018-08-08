#!/bin/bash

cp /boot/PiBakery/blocks/lighting/lighting.cron /etc/cron.d/lighting

mkdir -p /usr/local/lighting
mkdir -p /usr/local/lighting/node_modules
sed s/BH1750_BUS/$1/ < /boot/PiBakery/blocks/lighting/lighting.js > /tmp/lighting.js
sed s/BH1750_ADDRESS/$2/ < /tmp/lighting.js > /usr/local/lighting/lighting.js

cd /usr/local/lighting
chmod a+w /usr/local/lighting/node_modules
yes "" | su pi -c 'npm install bh1750'
chmod a-w /usr/local/lighting/node_modules
