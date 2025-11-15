#!/usr/bin/env pwsh
# Start Frontend (Expo)

Write-Host "Starting Recallify Frontend..." -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan

# Navigate to my-app directory
cd my-app

# Install dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    npm install
}

# Start Expo
Write-Host ""
Write-Host "Frontend starting..." -ForegroundColor Green
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

npm start
