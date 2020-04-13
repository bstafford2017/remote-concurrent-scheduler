#!/bin/bash
echo '====REMOTE-CONCURRENT-SCHEDULER===='

echo 'Resetting server dependencies...'
rm -R node_modules

echo 'Updating server dependencies...'
npm install --silent --no-progress

echo 'Checking for dependency updates...'
npm update --silent

echo 'Setting up server...'
npm run dev --silent