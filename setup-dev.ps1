#!/usr/bin/env pwsh
# Start both Frontend and Backend

Write-Host "Starting Recallify (Frontend + Backend)..." -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if backend venv exists and install if needed
if (-not (Test-Path "venv")) {
    Write-Host "Creating backend virtual environment..." -ForegroundColor Yellow
    python -m venv venv
}

# Check if frontend dependencies exist
if (-not (Test-Path "my-app/node_modules")) {
    Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
    cd my-app
    npm install
    cd ..
}

# Activate venv and install backend deps
Write-Host "Setting up backend..." -ForegroundColor Yellow
& .\venv\Scripts\Activate.ps1
pip install -r requirements.txt -q

Write-Host ""
Write-Host "SETUP COMPLETE!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps (open 2 separate terminals):" -ForegroundColor Yellow
Write-Host ""
Write-Host "Terminal 1 - Start Backend:" -ForegroundColor Cyan
Write-Host "  .\start-backend.ps1" -ForegroundColor White
Write-Host ""
Write-Host "Terminal 2 - Start Frontend:" -ForegroundColor Cyan
Write-Host "  .\start-frontend.ps1" -ForegroundColor White
Write-Host ""
Write-Host "Backend API: http://localhost:5000" -ForegroundColor Yellow
Write-Host "Frontend: Available via Expo" -ForegroundColor Yellow
Write-Host ""
