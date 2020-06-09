#!/bin/bash

sleep 20s
sudo -u pi chromium-browser --start-fullscreen --incognito http://192.168.4.1:5000/live.html&building=Upson%20II&room=125 || echo "Service Failed"
