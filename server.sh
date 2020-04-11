#!/bin/bash
echo '====REMOTE-CONCURRENT-SCHEDULER===='

echo 'Resetting server dependencies...'
rm -R node_modules

echo 'Updating server dependencies...'
npm install

echo 'Checking for dependency updates...'
npm update

echo 'Setting up server...'
npm run dev