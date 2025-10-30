@echo off
echo ========================================
echo   HotelLux Backend - Local Setup
echo ========================================
echo.

echo [1/4] Installing Node.js dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Setting up environment variables...
if not exist .env (
    copy .env.example .env
    echo ✓ Created .env file from template
) else (
    echo ✓ .env file already exists
)

echo.
echo [3/4] Creating directories...
if not exist data mkdir data
if not exist uploads mkdir uploads
echo ✓ Created data and uploads directories

echo.
echo [4/4] Initializing database and seeding demo data...
call npm run seed
if %errorlevel% neq 0 (
    echo ERROR: Failed to seed database
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Setup Complete! 🎉
echo ========================================
echo.
echo Backend server is ready to run on http://localhost:3001
echo.
echo Demo Login Credentials:
echo   Admin:        admin@hotel.com / admin123
echo   Receptionist: reception@hotel.com / reception123
echo   Housekeeping: housekeeping@hotel.com / house123
echo   Maintenance:  maintenance@hotel.com / maint123
echo   Guest:        guest@hotel.com / guest123
echo.
echo To start the server:
echo   npm run dev    (development with auto-reload)
echo   npm start      (production)
echo.
pause