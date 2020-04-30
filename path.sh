#!/bin/sh
2>/dev/null
p=$(ls -d /media/pi/*|head -1|sed 's/.*/\0\/full-database.sql.gz/' 2>/dev/null)
o=$(cat /home/pi/Desktop/remote-concurrent-scheduler/utils/dump.js|grep -o /media/pi/*/full-database.sql.gz) 2>/dev/null

if ["${p}" == ""] 2>/dev/null;
then
	#no usb found
	p="/home/pi/Desktop/remote-concurrent-scheduler/logs/full-database.sql.gz"
fi
#escape regex characters from new path(p) and old path(o)
p=$(echo "${p}"|sed -e 's/[]$.*[\^\/]/\\&/g') 2>/dev/null
o= $(echo "${o}"|sed -e 's/[]$.*[\^\/]/\\&/g') 2>/dev/null
#echo $p
sed -i -e "s/${o}/${p}/" /home/pi/Desktop/remote-concurrent-scheduler/utils/dump.js 2>/dev/null
#cat /home/pi/Desktop/remote-concurrent-scheduler/utils/dump.js