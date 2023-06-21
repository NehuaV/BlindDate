#!/bin/bash

# Function to kill all processes started by the script
function cleanup {
    if jobs -p | read; then
        echo "Cleaning up..."
        kill $(jobs -p)
    fi
}

# Exit script on error
set -e

# Trap any errors and execute the cleanup function
trap cleanup EXIT ERR

# Run development server
echo "Running development server..."
yarn dev &

# Wait for the server to start
sleep 5

# Run Krakend Gateway (Load test version)
echo "Starting Krakend Gateway..."
krakend run --config ./krakend/krakend-loadtest.json &

# Wait for the gateway to start
sleep 3

# Run Load Test
echo "Running Load Test..."
k6 run --out csv=./k6/out/data.csv --summary-export=./k6/out/summary.json ./k6/script/script.js

# Wait for all background jobs to finish
wait

echo "All tasks completed successfully."
