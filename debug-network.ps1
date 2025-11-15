#!/usr/bin/env pwsh
# Comprehensive Network Debugging for Expo Go

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Expo Go Network Troubleshooting" -ForegroundColor Yellow
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Get local IP
Write-Host "📍 Your Machine IP:" -ForegroundColor Green
$localIP = (ipconfig | Select-String -Pattern "IPv4 Address" | Select-Object -First 1) -replace '.*IPv4 Address.*?: ' 
Write-Host "   $localIP" -ForegroundColor White
Write-Host ""

# Check if backend is running
Write-Host "🔧 Backend Status:" -ForegroundColor Green
try {
    $response = curl -s -m 3 "http://localhost:5000/api/health" 2>$null
    if ($response -contains '"status"') {
        Write-Host "   ✅ Backend running on localhost:5000" -ForegroundColor Green
    } else {
        Write-Host "   ❌ Backend responding but invalid response" -ForegroundColor Red
    }
} catch {
    Write-Host "   ❌ Backend NOT responding on localhost:5000" -ForegroundColor Red
    Write-Host "   💡 Run: .\start-backend.ps1" -ForegroundColor Yellow
}

# Check if backend is listening on all interfaces
Write-Host ""
Write-Host "📡 Backend Port Check:" -ForegroundColor Green
$listeningPorts = netstat -ano | Select-String ":5000"
if ($listeningPorts) {
    Write-Host "   ✅ Port 5000 is listening" -ForegroundColor Green
} else {
    Write-Host "   ❌ Port 5000 is NOT listening" -ForegroundColor Red
}

# Check firewall
Write-Host ""
Write-Host "🔒 Windows Firewall:" -ForegroundColor Green
$pythonRule = Get-NetFirewallRule -DisplayName "*Python*" -ErrorAction SilentlyContinue
if ($pythonRule) {
    Write-Host "   ✅ Python/Flask allowed in firewall" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  No Python firewall rule found" -ForegroundColor Yellow
    Write-Host "   💡 You may need to allow Python through firewall" -ForegroundColor Yellow
}

# Check network connectivity
Write-Host ""
Write-Host "🌐 Network Connectivity:" -ForegroundColor Green
$hasNetwork = (Get-NetRoute | Where-Object -Property InterfaceAlias -EQ -Value "*Wi-Fi*" | Measure-Object).Count -gt 0
if ($hasNetwork) {
    Write-Host "   ✅ Wi-Fi interface detected" -ForegroundColor Green
} else {
    Write-Host "   ⚠️  No Wi-Fi interface detected" -ForegroundColor Yellow
}

# Test API endpoint
Write-Host ""
Write-Host "🧪 API Endpoint Test:" -ForegroundColor Green
Write-Host ""
Write-Host "   Try from your phone browser:" -ForegroundColor Cyan
Write-Host "   http://$localIP:5000/api/health" -ForegroundColor White
Write-Host ""
Write-Host "   If this works, your phone can reach the backend!" -ForegroundColor Green
Write-Host ""

# Display current config
Write-Host "⚙️  Current Configuration:" -ForegroundColor Green
Write-Host "   Backend IP in app: 172.25.117.203" -ForegroundColor White
Write-Host "   Environment: MOBILE" -ForegroundColor White
Write-Host "   Expected endpoint: http://172.25.117.203:5000" -ForegroundColor White
Write-Host ""

# Final checklist
Write-Host "✅ Troubleshooting Checklist:" -ForegroundColor Yellow
Write-Host ""
Write-Host "   1. [ ] Backend running? (.\start-backend.ps1)" -ForegroundColor White
Write-Host "   2. [ ] Phone on same Wi-Fi as computer?" -ForegroundColor White
Write-Host "   3. [ ] Phone can reach http://$localIP:5000/api/health?" -ForegroundColor White
Write-Host "   4. [ ] Correct IP in environment.ts? (Currently: 172.25.117.203)" -ForegroundColor White
Write-Host "   5. [ ] Try reloading Expo (press 'r' in terminal)" -ForegroundColor White
Write-Host ""
