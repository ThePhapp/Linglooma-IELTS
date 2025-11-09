@echo off
echo ============================================
echo LINGLOOMA IELTS - DATABASE MIGRATION
echo ============================================
echo.

REM Set PostgreSQL connection details
set PGHOST=localhost
set PGPORT=5432
set PGDATABASE=linglooma
set PGUSER=postgres

echo Current Configuration:
echo   Host: %PGHOST%
echo   Port: %PGPORT%
echo   Database: %PGDATABASE%
echo   User: %PGUSER%
echo.

REM Ask for password
set /p PGPASSWORD=Enter PostgreSQL password: 

echo.
echo ============================================
echo Starting Migration...
echo ============================================
echo.

REM Run migration
psql -U %PGUSER% -d %PGDATABASE% -f linglooma_complete_migration.sql

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ============================================
    echo ✅ MIGRATION COMPLETED SUCCESSFULLY!
    echo ============================================
    echo.
    echo Tables created: 11
    echo Sample data inserted:
    echo   - Users: 3
    echo   - Speaking lessons: 6
    echo   - Speaking questions: 54
    echo   - Reading passages: 3
    echo   - Reading questions: 9
    echo   - Writing tasks: 5
    echo.
    echo Next steps:
    echo 1. Update backend .env file with DB credentials
    echo 2. Start backend server: npm start
    echo 3. Test connection: http://localhost:5000/api/users/account
    echo.
) else (
    echo.
    echo ============================================
    echo ❌ MIGRATION FAILED
    echo ============================================
    echo.
    echo Possible reasons:
    echo   - PostgreSQL service not running
    echo   - Incorrect password
    echo   - Database 'linglooma' does not exist
    echo.
    echo Solutions:
    echo   1. Start PostgreSQL service
    echo   2. Create database: createdb linglooma
    echo   3. Check credentials in this script
    echo.
)

pause
