@echo off
echo Testing Writing API...
echo.

echo 1. Login to get token...
curl -X POST http://localhost:3000/api/login -H "Content-Type: application/json" -d "{\"email\":\"admin@gmail.com\",\"password\":\"123456\"}" > temp_token.txt
echo.

echo 2. Testing GET all prompts...
curl http://localhost:3000/api/writing
echo.
echo.

echo 3. Testing GET specific prompt...
curl http://localhost:3000/api/writing/3
echo.
echo.

echo Done! Check if backend is ready for essay submission.
echo Note: Actual submission requires valid JWT token from frontend.
pause
