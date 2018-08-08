#!/bin/bash

sed s/INTERVAL/$1/ < /boot/PiBakery/blocks/uptime/uptime.cron > /etc/cron.d/uptime

mkdir -p /usr/local/uptime
cp /boot/PiBakery/blocks/uptime/uptime.js /usr/local/uptime/uptime.js
