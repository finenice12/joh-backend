#!/data/data/com.termux/files/usr/bin/bash

# Navigate to your backend folder
cd ~/joh-backend

# Start Node.js backend in the background, logging output
echo "Starting Joh-backend..."
node server.js > backend.log 2>&1 &
NODE_PID=$!

# Wait a few seconds to ensure Node.js started
sleep 3

# Start Cloudflare Tunnel, logging output
echo "Starting Cloudflare Tunnel..."
cloudflared tunnel run --token eyJhIjoiYzYwNjQ5YjUyNDNjZDVmODE5MmVkZjA3MDJjMGJjNjAiLCJ0IjoiZmJlNDU2NjctY2RiYy00MjY3LTgyOTktZmU5MDZjNDY5MzUwIiwicyI6Ik16aG1aalZoTkRZdFl6aGlOUzAwT1dObUxUZ3daR0V0WkdNME0yWmpOekUwWm1SbSJ9 > tunnel.log 2>&1 &
TUNNEL_PID=$!

# Display running processes
echo "Joh-backend PID: $NODE_PID"
echo "Cloudflare Tunnel PID: $TUNNEL_PID"

# Tail logs for monitoring
echo "Tailing backend and tunnel logs..."
tail -f backend.log tunnel.log
