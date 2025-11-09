@echo off
echo ==========================================
echo Checking Port 5432 Status
echo ==========================================
echo.

echo Processes using port 5432:
netstat -ano | findstr :5432

echo.
echo.
echo ==========================================
echo Solutions:
echo ==========================================
echo.
echo Option 1: Stop local PostgreSQL service
echo   sc stop postgresql-x64-15
echo   OR
echo   services.msc (find PostgreSQL and stop it)
echo.
echo Option 2: Stop Docker containers
echo   docker-compose down
echo   docker stop $(docker ps -aq)
echo.
echo Option 3: Change Docker port mapping
echo   Edit docker-compose.yml
echo   Change "5432:5432" to "5433:5432"
echo   Then use DB_PORT=5433 in .env
echo.
echo Press any key to try stopping local PostgreSQL...
pause >nul

echo.
echo Attempting to stop PostgreSQL service...
net stop postgresql-x64-15 2>nul
if %ERRORLEVEL% EQU 0 (
    echo SUCCESS: PostgreSQL service stopped
) else (
    echo Note: Service might have different name or not running as service
    echo Try manually: services.msc
)

echo.
echo Attempting to stop Docker containers...
docker-compose down 2>nul

echo.
echo Current port status:
netstat -ano | findstr :5432

echo.
pause
