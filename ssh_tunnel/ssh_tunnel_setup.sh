#!/bin/bash

ssh-keygen -t rsa -f /root/.ssh/id_rsa -N ''
cp /boot/PiBakery/blocks/ssh_tunnel/tunnel_rsa /root/.ssh/tunnel_rsa
chmod 600 /root/.ssh/tunnel_rsa
cp /boot/PiBakery/blocks/ssh_tunnel/ssh_tunnel.cron /etc/cron.d/ssh_tunnel
mkdir -p /usr/local/ssh_tunnel
sed s/REMOTE_PORT/$1/ < /boot/PiBakery/blocks/ssh_tunnel/ssh_tunnel.sh > /usr/local/ssh_tunnel/ssh_tunnel.sh
chmod +x /usr/local/ssh_tunnel/ssh_tunnel.sh
