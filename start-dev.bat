@echo off
echo Starting development servers...

:: Start the backend server in a new window
start cmd.exe /k "cd server && npm run dev"

:: Wait a moment for the backend to initialize
timeout /t 3

:: Start the frontend server in a new window
start cmd.exe /k "npm run dev"

echo Development servers started!
echo Frontend: http://localhost:3000
echo Backend: http://localhost:3002/api/health
echo.
echo To test Stripe integration, visit: http://localhost:3000/donate?enable-stripe
