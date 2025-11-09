@echo off
REM ==========================================
REM Restart Frontend Dev Server
REM ==========================================

echo.
echo ========================================
echo  Restarting Frontend (Vite)
echo ========================================
echo.

echo [1/2] Stopping any running Vite process...
taskkill /F /IM node.exe /FI "WINDOWTITLE eq vite*" 2>nul
timeout /t 2 /nobreak >nul

echo [2/2] Starting Vite dev server...
echo.
echo Backend URL: https://linglooma-ielts-2.onrender.com
echo Frontend URL: http://localhost:4028
echo.
npm run dev
