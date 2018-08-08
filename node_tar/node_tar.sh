#!/bin/bash

cd /usr/local
sudo tar zxvf /boot/PiBakery/blocks/node_tar/node-v4.8.0-linux-armv6l.tar.gz
cd bin
sudo ln -s /usr/local/node-v4.8.0-linux-armv6l/bin/* .
