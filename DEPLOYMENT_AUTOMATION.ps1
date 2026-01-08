$ErrorActionPreference = "Stop"

Write-Host "Starting Automated Deployment..." -ForegroundColor Green

# 1. Root (Frontend) Dependencies
Write-Host "Installing Frontend Dependencies..." -ForegroundColor Cyan
npm install
if ($LASTEXITCODE -ne 0) { Write-Error "Frontend install failed"; exit 1 }

# 2. Backend Dependencies
Write-Host "Installing Backend Dependencies..." -ForegroundColor Cyan
cd backend
npm install
if ($LASTEXITCODE -ne 0) { Write-Error "Backend install failed"; exit 1 }
cd ..

# 3. Build Backend
Write-Host "Building Backend..." -ForegroundColor Cyan
cd backend
npm run build
if ($LASTEXITCODE -ne 0) { Write-Error "Backend build failed"; exit 1 }
cd ..

# 4. Build Frontend
Write-Host "Building Frontend..." -ForegroundColor Cyan
npm run build
if ($LASTEXITCODE -ne 0) { Write-Error "Frontend build failed"; exit 1 }

# 5. Start Services
Write-Host "Deployment Ready. Starting services..." -ForegroundColor Green
Write-Host "Starting Backend in background..."
Start-Process -FilePath "npm.cmd" -ArgumentList "start" -WorkingDirectory "backend" -NoNewWindow
Start-Sleep -Seconds 5

Write-Host "Starting Frontend..."
npm start
