@echo off
echo ========================================
echo Testing Writing API Endpoints
echo ========================================
echo.

echo 1. GET /api/writing - Get all prompts
curl http://localhost:3000/api/writing
echo.
echo.

echo 2. GET /api/writing/1 - Get specific prompt
curl http://localhost:3000/api/writing/1
echo.
echo.

echo ========================================
echo Writing API Test Complete
echo ========================================
echo.
echo Note: To test submission endpoints, you need to:
echo 1. Login to get a token
echo 2. Use the token in Authorization header
echo 3. POST to /api/writing/:id/submit with essay text
echo.

pause
