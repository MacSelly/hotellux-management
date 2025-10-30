@echo off
echo Removing git credentials...
git config --global --unset user.name
git config --global --unset user.email
git config --global --unset credential.helper

echo Clearing Windows Credential Manager...
cmdkey /list | findstr git | for /f "tokens=1,2 delims= " %%G in ('more') do cmdkey /delete:%%H

echo Removing git repository...
rmdir /s /q .git 2>nul

echo Git account and repository removed!
pause