@echo off
REM Script untuk update password di database.php dan database_mysqli.php
REM Usage: update-db-password.bat YOUR_PASSWORD_HERE

echo.
echo ========================================
echo   INFINITYFREE DATABASE PASSWORD UPDATER
echo ========================================
echo.

if "%1"=="" (
    echo ERROR: Password tidak diberikan!
    echo Usage: update-db-password.bat YOUR_PASSWORD
    echo.
    echo Contoh: update-db-password.bat mySecurePass123
    exit /b 1
)

set PASSWORD=%1

echo Updating api/config/database.php...
powershell -Command "(gc api\config\database.php) -replace 'private \$password = \"\"', 'private $password = \"%PASSWORD%\"' | Out-File -encoding UTF8 api\config\database.php"

echo Updating api/config/database_mysqli.php...
powershell -Command "(gc api\config\database_mysqli.php) -replace 'private \$password = \"\"', 'private $password = \"%PASSWORD%\"' | Out-File -encoding UTF8 api\config\database_mysqli.php"

echo.
echo ========================================
echo   PASSWORD UPDATED SUCCESSFULLY!
echo ========================================
echo.
echo Next steps:
echo 1. Upload folder 'api/' to InfinityFree
echo 2. Import database via phpMyAdmin
echo 3. Test: https://kualaoutdoor.free.nf/api/public/equipment.php
echo.

pause
