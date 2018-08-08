#!/bin/bash
createTunnel() {
  /usr/bin/ssh -p 7799 -i /root/.ssh/tunnel_rsa -N -R REMOTE_PORT:localhost:22 limited-user@45.76.120.239
  if [[ $? -eq 0 ]]; then
    echo Tunnel to jumpbox created successfully
  else
    echo An error occurred creating a tunnel to jumpbox. RC was $?
  fi
}
/bin/pidof ssh
if [[ $? -ne 0 ]]; then
  echo Creating new tunnel connection
  createTunnel
fi
