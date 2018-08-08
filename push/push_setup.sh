#!/bin/bash

sed s/INTERVAL/$1/ < /boot/PiBakery/blocks/push/push.cron > /etc/cron.d/push

mkdir -p /usr/local/push
cp /boot/PiBakery/blocks/push/push.js /usr/local/push/push.js
