@echo off
echo Configuring git...
git config user.name "MacSelly"
git config user.email "macselly@example.com"

echo Initializing git repository...
git init

echo Adding all files...
git add .

echo Creating initial commit...
git commit -m "Initial commit: HotelLux Management System with glassmorphism UI"
if errorlevel 1 (
    echo Commit failed! Check for errors above.
    pause
    exit /b 1
)

echo Setting up GitHub connection...
set /p username="Enter YOUR GitHub username: "
set /p reponame="Enter repository name: "

echo Removing existing remote...
git remote remove origin 2>nul

echo Adding remote origin...
git remote add origin https://github.com/%username%/%reponame%.git

echo Setting main branch...
git branch -m master main

echo Pushing to GitHub...
git push -u origin main

echo.
echo Repository created and pushed successfully!
pause