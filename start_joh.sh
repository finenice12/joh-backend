#!/data/data/com.termux/files/usr/bin/bash

# Start Node.js backend in the background
echo "Starting Joh-backend..."
node ~/joh-backend/server.js &

# Wait a few seconds to make sure Node.js starts
sleep 3

# Start Cloudflare Tunnel
echo "Starting Cloudflare Tunnel..."
cloudflared tunnel run --token eyJhIjoiYzYwNjQ5YjUyNDNjZDVmODE5MmVkZjA3MDJjMGJjNjAiLCJ0IjoiZmJlNDU2NjctY2RiYy00MjY3LTgyOTktZmU5MDZjNDY5MzUwIiwicyI6Ik16aG1aalZoTkRZdFl6aGlOUzAwT1dObUxUZ3daR0V0WkdNME0yWmpOekUwWm1SbSJ9
