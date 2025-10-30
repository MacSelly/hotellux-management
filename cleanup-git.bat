@echo off
echo Removing git repository...
rmdir /s /q .git

echo Removing git setup files...
del setup-git.bat
del cleanup-git.bat

echo Git repository removed successfully!
pause