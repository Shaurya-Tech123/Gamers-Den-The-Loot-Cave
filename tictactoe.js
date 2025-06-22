class TicTacToe {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.playerScore = 0;
        this.aiScore = 0;
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        this.initializeGame();
    }

    initializeGame() {
        // Add event listeners to cells
        const cells = document.querySelectorAll('#tictactoe-board .cell');
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });

        // Add reset button listener
        document.getElementById('tictactoe-reset').addEventListener('click', () => this.resetGame());
    }

    handleCellClick(index) {
        if (this.board[index] === '' && this.gameActive && this.currentPlayer === 'X') {
            this.makeMove(index, 'X');
            
            if (this.gameActive) {
                // AI's turn
                setTimeout(() => {
                    const aiMove = this.findBestMove();
                    if (aiMove !== -1) {
                        this.makeMove(aiMove, 'O');
                    }
                }, 500);
            }
        }
    }

    makeMove(index, player) {
        this.board[index] = player;
        const cell = document.querySelector(`#tictactoe-board .cell[data-index="${index}"]`);
        cell.textContent = player;
        cell.classList.add(player.toLowerCase());

        if (this.checkWin(player)) {
            this.gameActive = false;
            this.highlightWinningCells();
            if (player === 'X') {
                this.playerScore++;
                this.updateStatus('You win! 🎉');
            } else {
                this.aiScore++;
                this.updateStatus('AI wins! 🤖');
            }
            this.updateScore();
        } else if (this.isBoardFull()) {
            this.gameActive = false;
            this.updateStatus("It's a draw! 🤝");
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updateStatus(this.currentPlayer === 'X' ? 'Your turn (X)' : 'AI thinking...');
        }
    }

    findBestMove() {
        let bestScore = -Infinity;
        let bestMove = -1;

        for (let i = 0; i < 9; i++) {
            if (this.board[i] === '') {
                this.board[i] = 'O';
                let score = this.minimax(this.board, 0, false);
                this.board[i] = '';
                
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }

        return bestMove;
    }

    minimax(board, depth, isMaximizing) {
        if (this.checkWinForMinimax('O')) return 10 - depth;
        if (this.checkWinForMinimax('X')) return depth - 10;
        if (this.isBoardFull()) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = 'O';
                    let score = this.minimax(board, depth + 1, false);
                    board[i] = '';
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === '') {
                    board[i] = 'X';
                    let score = this.minimax(board, depth + 1, true);
                    board[i] = '';
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }

    checkWin(player) {
        return this.winningCombinations.some(combination => {
            return combination.every(index => this.board[index] === player);
        });
    }

    checkWinForMinimax(player) {
        return this.winningCombinations.some(combination => {
            return combination.every(index => this.board[index] === player);
        });
    }

    isBoardFull() {
        return this.board.every(cell => cell !== '');
    }

    highlightWinningCells() {
        this.winningCombinations.forEach(combination => {
            if (combination.every(index => this.board[index] === this.currentPlayer)) {
                combination.forEach(index => {
                    const cell = document.querySelector(`#tictactoe-board .cell[data-index="${index}"]`);
                    cell.classList.add('win');
                });
            }
        });
    }

    updateStatus(message) {
        document.getElementById('tictactoe-status').textContent = message;
    }

    updateScore() {
        document.getElementById('player-score').textContent = this.playerScore;
        document.getElementById('ai-score').textContent = this.aiScore;
    }

    resetGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;

        // Clear board
        const cells = document.querySelectorAll('#tictactoe-board .cell');
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'win');
        });

        this.updateStatus('Your turn (X)');
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
}); 