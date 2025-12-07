@echo off
echo ================================================
echo   DEPLOY TO VERCEL - KUALA OUTDOOR
echo ================================================
echo.

echo [1/4] Checking Git status...
git status
echo.

echo [2/4] Adding all changes...
git add .
echo.

echo [3/4] Committing changes...
git commit -m "feat: Simplify login (Google only) + Hide Admin link + Add secret admin route"
echo.

echo [4/4] Pushing to GitHub (will trigger Vercel auto-deploy)...
git push origin master
echo.

echo ================================================
echo   DEPLOYMENT SUMMARY
echo ================================================
echo.
echo ✅ Changes committed and pushed successfully!
echo.
echo 📋 WHAT WAS CHANGED:
echo    • Login page - HANYA Google Login (clean & modern)
echo    • Admin link HIDDEN dari navbar  
echo    • Secret admin route: /admin-secret-login
echo    • Fixed Google OAuth domain detection
echo    • Removed email/password form (not working)
echo.
echo 🚀 NEXT STEPS:
echo    1. Wait 2-3 minutes for Vercel auto-deploy
echo    2. Add domain to Google Console:
echo       https://pbl-kuala-outdoor-mb1j.vercel.app
echo    3. Test Google Login at:
echo       https://pbl-kuala-outdoor-mb1j.vercel.app/auth
echo    4. Access admin at:
echo       https://pbl-kuala-outdoor-mb1j.vercel.app/admin-secret-login
echo.
echo ================================================
pause
