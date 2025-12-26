@echo off
echo ==============================================
echo   TenantVerse Quick Start (Windows)
echo ==============================================

cd backend
if not exist .env (
    echo [INFO] Creating backend .env from example...
    copy .env.example .env
)
echo [INFO] Installing Backend Dependencies...
call npm install
echo [INFO] Building Backend...
call npm run build

cd ..
echo [INFO] Installing Frontend Dependencies...
call npm install
echo [INFO] Building Frontend...
call npm run build

echo.
echo ==============================================
echo   Ready! Starting Servers...
echo ==============================================
echo.

start "TenantVerse Backend" cmd /k "cd backend && npm run start"
start "TenantVerse Frontend" cmd /k "npm run start -- -p 9002"

echo [SUCCESS] Servers launched in new windows.
echo - Frontend: http://localhost:9002
echo - Backend: http://localhost:5000
echo.
pause
