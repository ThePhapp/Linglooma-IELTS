@echo off
echo ==========================================
echo Running Reading Migration SQL
echo ==========================================
echo.

REM Tìm container ID của PostgreSQL
for /f "tokens=*" %%i in ('docker ps -qf "name=db"') do set CONTAINER_ID=%%i

if "%CONTAINER_ID%"=="" (
    echo ERROR: PostgreSQL container not found!
    echo Please make sure Docker is running and the database container is started.
    echo Try: docker-compose up -d
    pause
    exit /b 1
)

echo Found PostgreSQL container: %CONTAINER_ID%
echo.

REM Copy migration file vào container
echo Copying migration file to container...
docker cp ..\02-database-postgresql\reading_migration.sql %CONTAINER_ID%:/tmp/reading_migration.sql

if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to copy migration file
    pause
    exit /b 1
)

echo.
echo Running migration...
docker exec -it %CONTAINER_ID% psql -U postgres -d linglooma -f /tmp/reading_migration.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ==========================================
    echo Migration completed successfully!
    echo ==========================================
    echo.
    echo You can now test the Reading API:
    echo - GET  http://localhost:3000/api/reading
    echo - GET  http://localhost:3000/api/reading/1
    echo - POST http://localhost:3000/api/reading/1/submit
    echo.
) else (
    echo.
    echo ERROR: Migration failed!
    echo Please check the error messages above.
)

pause
