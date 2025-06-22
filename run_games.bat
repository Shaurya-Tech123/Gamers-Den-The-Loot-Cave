@echo off
echo ========================================
echo    Gaming Den - Java Games Launcher
echo ========================================
echo.

cd games

echo Choose a game to run:
echo 1. Tic Tac Toe
echo 2. Pac-Man
echo 3. Chess
echo 4. Exit
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
    echo Starting Tic Tac Toe...
    java TicTacToe
) else if "%choice%"=="2" (
    echo Starting Pac-Man...
    java Pacman
) else if "%choice%"=="3" (
    echo Starting Chess...
    java Chess
) else if "%choice%"=="4" (
    echo Goodbye!
) else (
    echo Invalid choice. Please run the script again.
)

cd ..
pause 