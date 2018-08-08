#!/bin/bash

apt-get install ppp -y

cp /boot/PiBakery/blocks/sakis3g/sakis3g.cron /etc/cron.d/sakis3g

mkdir /usr/local/modem3g
chmod 777 /usr/local/modem3g
cd /usr/local/modem3g
tar -zxvf /boot/PiBakery/blocks/sakis3g/sakis3g.tar.gz
chmod +x sakis3g

echo "APN=\"$1\"" > /etc/sakis3g.conf
