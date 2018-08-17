#!/bin/bash

mkdir -p /usr/local/config
echo '{"filename": "'$1'", "uuid": "'$2'", "token": "'$3'", "host": "'$4'",  "protocol": "'$5'",  "port": "'$6'"}'
echo '{"filename": "'$1'", "uuid": "'$2'", "token": "'$3'", "host": "'$4'",  "protocol": "'$5'",  "port": "'$6'"}' > /usr/local/config/$1
