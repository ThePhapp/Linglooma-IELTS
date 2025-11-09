@echo off
echo ==========================================
echo Testing Reading API Endpoints
echo ==========================================
echo.

set API_URL=http://localhost:3000

echo [1/4] Testing GET /api/reading - Get all passages
echo ----------------------------------------
curl -s %API_URL%/api/reading
echo.
echo.

timeout /t 2 /nobreak >nul

echo [2/4] Testing GET /api/reading/1 - Get passage with questions
echo ----------------------------------------
curl -s %API_URL%/api/reading/1
echo.
echo.

timeout /t 2 /nobreak >nul

echo [3/4] Testing POST /api/reading/1/submit - Submit answers (NEED TOKEN)
echo ----------------------------------------
echo Note: You need to replace YOUR_JWT_TOKEN with actual token
echo Example payload:
echo {
echo   "answers": [
echo     {"questionId": 1, "selectedOptionId": 2},
echo     {"questionId": 2, "selectedOptionId": 6},
echo     {"questionId": 3, "selectedOptionId": 11},
echo     {"questionId": 4, "selectedOptionId": 13}
echo   ]
echo }
echo.
echo To test with token, run:
echo curl -X POST %API_URL%/api/reading/1/submit ^
echo   -H "Authorization: Bearer YOUR_TOKEN" ^
echo   -H "Content-Type: application/json" ^
echo   -d "{\"answers\":[{\"questionId\":1,\"selectedOptionId\":2}]}"
echo.
echo.

echo [4/4] Testing GET /api/reading/results/history - Get student history (NEED TOKEN)
echo ----------------------------------------
echo Note: You need to replace YOUR_JWT_TOKEN with actual token
echo.
echo To test with token, run:
echo curl %API_URL%/api/reading/results/history ^
echo   -H "Authorization: Bearer YOUR_TOKEN"
echo.
echo.

echo ==========================================
echo Test Summary
echo ==========================================
echo.
echo Public endpoints (no auth needed):
echo   - GET  /api/reading
echo   - GET  /api/reading/:id
echo.
echo Protected endpoints (need JWT token):
echo   - POST /api/reading/:id/submit
echo   - GET  /api/reading/results/history
echo   - GET  /api/reading/results/:resultId
echo.
echo To get a token, first login:
echo curl -X POST %API_URL%/api/login ^
echo   -H "Content-Type: application/json" ^
echo   -d "{\"email\":\"your@email.com\",\"password\":\"yourpassword\"}"
echo.
echo ==========================================

pause
