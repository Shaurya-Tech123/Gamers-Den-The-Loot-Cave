#!/bin/bash

echo "========================================"
echo "   Gaming Den - Java Games Compiler"
echo "========================================"
echo

echo "Checking Java installation..."
if ! command -v java &> /dev/null; then
    echo "ERROR: Java is not installed or not in PATH"
    echo "Please install Java Development Kit (JDK) 8 or higher"
    exit 1
fi

echo "Java found! Compiling games..."
echo

cd games

echo "Compiling TicTacToe.java..."
javac TicTacToe.java
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to compile TicTacToe.java"
    exit 1
fi

echo "Compiling Pacman.java..."
javac Pacman.java
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to compile Pacman.java"
    exit 1
fi

echo "Compiling Chess.java..."
javac Chess.java
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to compile Chess.java"
    exit 1
fi

echo
echo "========================================"
echo "   All games compiled successfully!"
echo "========================================"
echo

echo "Choose a game to run:"
echo "1. Tic Tac Toe"
echo "2. Pac-Man"
echo "3. Chess"
echo "4. Exit"
echo

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo "Starting Tic Tac Toe..."
        java TicTacToe
        ;;
    2)
        echo "Starting Pac-Man..."
        java Pacman
        ;;
    3)
        echo "Starting Chess..."
        java Chess
        ;;
    4)
        echo "Goodbye!"
        ;;
    *)
        echo "Invalid choice. Please run the script again."
        ;;
esac

cd .. 