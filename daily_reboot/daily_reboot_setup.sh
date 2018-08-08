#!/bin/bash

cp /boot/PiBakery/blocks/daily_reboot/daily_reboot.cron /etc/cron.d/daily_reboot
sed s/REBOOT_HOUR/$1/ </etc/cron.d/daily_reboot >//etc/cron.d/daily_reboot
sed s/REBOOT_MINUTE/$2/ </etc/cron.d/daily_reboot >//etc/cron.d/daily_reboot

cat /boot/PiBakery/blocks/daily_reboot/daily_reboot.cron | \
  sed s/REBOOT_HOUR/$1/ | \
  sed s/REBOOT_MINUTE/$2/ > /etc/cron.d/daily_reboot
