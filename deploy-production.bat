@echo off
ECHO ========================================
ECHO   KUALA OUTDOOR - BUILD & DEPLOY
ECHO   Railway Backend + Vercel Frontend
ECHO ========================================
ECHO.

ECHO [1/6] Checking Git status...
git status --short
ECHO.

ECHO [2/6] Running URL migration script...
node update-to-railway.js
ECHO.

ECHO [3/6] Installing dependencies...
call npm install
ECHO.

ECHO [4/6] Building production bundle...
call npm run build
ECHO.

ECHO [5/6] Committing changes to Git...
git add .
git commit -m "Production build: Railway + Vercel migration"
ECHO.

ECHO [6/6] Pushing to GitHub...
git push origin master
ECHO.

ECHO ========================================
ECHO   BUILD COMPLETE!
ECHO ========================================
ECHO.
ECHO Next steps (MANUAL):
ECHO.
ECHO 1. BACKEND (Railway)
ECHO    - Go to: https://railway.app/dashboard
ECHO    - Check deployment status
ECHO    - Set MySQL environment variables
ECHO    - Test: https://pbl-kuala-outdoor-production.up.railway.app/api/public/equipment.php
ECHO.
ECHO 2. FRONTEND (Vercel)  
ECHO    - Go to: https://vercel.com/dashboard
ECHO    - Check deployment status
ECHO    - Verify environment variables are set
ECHO    - Test: https://pbl-kuala-outdoor.vercel.app
ECHO.
ECHO 3. GOOGLE OAUTH
ECHO    - Go to: https://console.cloud.google.com/apis/credentials
ECHO    - Add: https://pbl-kuala-outdoor.vercel.app
ECHO    - To Authorized JavaScript origins
ECHO    - Add redirect URIs (see GOOGLE_OAUTH_RAILWAY_SETUP.md)
ECHO.
ECHO 4. TEST EVERYTHING
ECHO    - Login with Google
ECHO    - Browse equipment (images should load)
ECHO    - Add to cart
ECHO    - Admin: Upload/Update/Delete equipment
ECHO.
ECHO ========================================
ECHO Documentation:
ECHO   - README_DEPLOYMENT_RAILWAY.md
ECHO   - GOOGLE_OAUTH_RAILWAY_SETUP.md
ECHO ========================================
ECHO.
pause
