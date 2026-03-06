#!/data/data/com.termux/files/usr/bin/bash

# Go to project directory
cd ~/joh-backend

# Start Node backend in background
nohup node server.js > backend.log 2>&1 &

# Remove old tunnel log
rm -f tunnel.log

# Start ngrok tunnel in background, log to tunnel.log
nohup ./ngrok http 3000 > tunnel.log 2>&1 &

echo "Backend running on port 3000"
echo "Waiting for ngrok tunnel to start..."

# Wait for ngrok to output the public URL
URL=""
while [ -z "$URL" ]; do
    sleep 1
    URL=$(grep -o 'https://[a-z0-9.-]*\.ngrok.io' tunnel.log | head -n 1)
done

echo "🌐 Public URL is: $URL"
echo "Check backend logs: tail -f backend.log"
