#!/bin/bash
echo '====REMOTE-CONCURRENT-SCHEDULER===='

echo 'Resetting server dependencies...'
rm -R node_modules

echo 'Updating server dependencies...'
npm install --silent --no-progress

echo 'Checking for dependency updates...'
npm update --silent

echo 'Checking USB for backup'
./path.sh

echo 'Setting up server...'
npm run dev --silent

echo 'Openning web app'
chromium-browser --start-fullscreen http://localhost:5000/live.html&building=Upson%20II&room=125