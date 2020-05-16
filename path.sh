#!/bin/sh

#get location of usb & add full-database.sql.gz
p=$(ls -d /media/pi/* 2>/dev/null|head -1|sed 's/.*/\0\/full-database.sql.gz/' 2>/dev/null)

#get current path referenced in dump.js
o=$(cat /home/pi/Desktop/remote-concurrent-scheduler/utils/dump.js|grep -o /.*/.*\.sql\.gz) 2>/dev/null

#check for usb
if ["${p}" == ""] 2>/dev/null;
then
	#no usb found
	p="/home/pi/Desktop/remote-concurrent-scheduler/logs/full-database.sql.gz"
fi
#escape regex characters from new path(p) and old path(o)
p=$(echo "${p}"|sed -e 's/[]$.*[\^\/]/\\&/g') 2>/dev/null
o=$(echo "${o}"|sed -e 's/[]$.*[\^\/]/\\&/g') 2>/dev/null

#swap out old path for current one
sed -i -e "s/${o}/${p}/" /home/pi/Desktop/remote-concurrent-scheduler/utils/dump.js 
