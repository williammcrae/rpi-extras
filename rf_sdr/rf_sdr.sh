#!/bin/bash

sudo apt-get update
sudo apt-get install git libtool libusb-1.0.0-dev librtlsdr-dev rtl-sdr cmake -y

cd /root
mkdir /root/.ssh
echo -e "Host github.com\n\tStrictHostKeyChecking no\n" >> ~/.ssh/config
curl -o rtl_433.zip https://codeload.github.com/merbanan/rtl_433/zip/master
unzip rtl_433.zip
cd rtl_433-master
mkdir build
cd build
cmake ../
make
make install

printf "blacklist dvb_usb_rtl28xxu \nblacklist rtl2832 \nblacklist rtl2830\n" > /etc/modprobe.d/no-rtl.conf
