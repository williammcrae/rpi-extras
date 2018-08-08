#!/bin/bash

cp /boot/PiBakery/blocks/low_bat_shutdown/power_check /etc/cron.d
mkdir -p /usr/local/low_bat_shutdown
sed s/GPIO_SELECTION/$1/ </boot/PiBakery/blocks/low_bat_shutdown/low_bat_shutdown >/usr/local/low_bat_shutdown/low_bat_shutdown
chmod +x /usr/local/low_bat_shutdown/low_bat_shutdown
