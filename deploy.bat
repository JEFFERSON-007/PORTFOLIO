@echo off
echo ========================================
echo   Jefferson Raja - 3D Portfolio Deployer
echo ========================================
echo.
echo [1/3] Staging changes...
"C:\Program Files\Git\cmd\git.exe" add .
if %errorlevel% neq 0 (
    echo Error during git add.
    pause
    exit /b %errorlevel%
)

echo [2/3] Committing changes...
"C:\Program Files\Git\cmd\git.exe" commit -m "Aggressive performance optimizations and mobile layout fixes"
if %errorlevel% neq 0 (
    echo No changes to commit or error during git commit.
)

echo [3/3] Pushing to GitHub...
"C:\Program Files\Git\cmd\git.exe" push origin main
if %errorlevel% neq 0 (
    echo Error during git push.
    pause
    exit /b %errorlevel%
)

echo.
echo ========================================
echo   DEPLOΥMENT COMPLETE! 🚀
echo   Check 'Actions' on GitHub for status.
echo ========================================
pause
