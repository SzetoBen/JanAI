#!/usr/bin/env pwsh
# Start Backend API

Write-Host "Starting Recallify Backend API..." -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan

# Check if venv exists
if (Test-Path "venv") {
    Write-Host "Activating virtual environment..." -ForegroundColor Yellow
    & .\venv\Scripts\Activate.ps1
} else {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
    & .\venv\Scripts\Activate.ps1
}

# Install/update requirements
Write-Host "Installing dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt -q

# Start Flask app
Write-Host ""
Write-Host "Backend API starting on http://localhost:5000" -ForegroundColor Green
Write-Host "Health check: http://localhost:5000/api/health" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

cd backend
python app.py
