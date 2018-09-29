#!/bin/bash
cd "$(dirname "$0")"
while true
do
node index.js
echo "CTLR+C to stop the bot."
echo "Rebooting in:"
for i in 5 4 3 2 1
do
echo "$i..."
sleep 1
done
echo "Rebooting now!"
done 