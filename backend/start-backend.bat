@echo off
taskkill /F /IM brewed-for-u-backend.exe >nul 2>&1
echo Starting Brewed For U backend...
go run .
pause
