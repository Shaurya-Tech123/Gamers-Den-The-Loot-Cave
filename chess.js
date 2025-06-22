class ChessGame {
    constructor() {
        this.board = this.initializeBoard();
        this.currentPlayer = 'white';
        this.selectedPiece = null;
        this.validMoves = [];
        this.gameOver = false;
        this.capturedPieces = [];
        
        this.initializeGame();
    }
    
    initializeBoard() {
        const board = Array(8).fill().map(() => Array(8).fill(null));
        
        // Set up pawns
        for (let i = 0; i < 8; i++) {
            board[1][i] = { type: 'pawn', color: 'black' };
            board[6][i] = { type: 'pawn', color: 'white' };
        }
        
        // Set up other pieces
        const pieces = ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
        for (let i = 0; i < 8; i++) {
            board[0][i] = { type: pieces[i], color: 'black' };
            board[7][i] = { type: pieces[i], color: 'white' };
        }
        
        return board;
    }
    
    initializeGame() {
        this.renderBoard();
        this.updateStatus();
        
        // Add reset button listener
        document.getElementById('chess-reset').addEventListener('click', () => this.resetGame());
    }
    
    renderBoard() {
        const boardElement = document.getElementById('chess-board');
        boardElement.innerHTML = '';
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = `chess-square ${(row + col) % 2 === 0 ? 'white' : 'black'}`;
                square.dataset.row = row;
                square.dataset.col = col;
                
                // Add selection and valid move classes
                if (this.selectedPiece && this.selectedPiece.row === row && this.selectedPiece.col === col) {
                    square.classList.add('selected');
                }
                
                if (this.validMoves.some(move => move.row === row && move.col === col)) {
                    square.classList.add('valid-move');
                }
                
                // Add piece if present
                const piece = this.board[row][col];
                if (piece) {
                    const pieceElement = document.createElement('div');
                    pieceElement.className = `chess-piece ${piece.color}`;
                    pieceElement.textContent = this.getPieceSymbol(piece);
                    square.appendChild(pieceElement);
                }
                
                square.addEventListener('click', () => this.handleSquareClick(row, col));
                boardElement.appendChild(square);
            }
        }
    }
    
    getPieceSymbol(piece) {
        const symbols = {
            'king': '♔',
            'queen': '♕',
            'rook': '♖',
            'bishop': '♗',
            'knight': '♘',
            'pawn': '♙'
        };
        
        if (piece.color === 'black') {
            const blackSymbols = {
                'king': '♚',
                'queen': '♛',
                'rook': '♜',
                'bishop': '♝',
                'knight': '♞',
                'pawn': '♟'
            };
            return blackSymbols[piece.type];
        }
        
        return symbols[piece.type];
    }
    
    handleSquareClick(row, col) {
        if (this.gameOver) return;
        
        const piece = this.board[row][col];
        
        // If clicking on a piece of the current player
        if (piece && piece.color === this.currentPlayer) {
            this.selectedPiece = { row, col, piece };
            this.validMoves = this.getValidMoves(row, col);
            this.renderBoard();
            return;
        }
        
        // If clicking on a valid move square
        if (this.selectedPiece && this.validMoves.some(move => move.row === row && move.col === col)) {
            this.makeMove(this.selectedPiece.row, this.selectedPiece.col, row, col);
            this.selectedPiece = null;
            this.validMoves = [];
            this.renderBoard();
            return;
        }
        
        // Clear selection
        this.selectedPiece = null;
        this.validMoves = [];
        this.renderBoard();
    }
    
    makeMove(fromRow, fromCol, toRow, toCol) {
        const piece = this.board[fromRow][fromCol];
        const capturedPiece = this.board[toRow][toCol];
        
        // Move piece
        this.board[toRow][toCol] = piece;
        this.board[fromRow][fromCol] = null;
        
        // Handle captured piece
        if (capturedPiece) {
            this.capturedPieces.push(capturedPiece);
            this.updateCapturedCount();
        }
        
        // Handle pawn promotion
        if (piece.type === 'pawn' && (toRow === 0 || toRow === 7)) {
            piece.type = 'queen';
        }
        
        // Switch players
        this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
        this.updateStatus();
        
        // Check for game over
        if (this.isCheckmate()) {
            this.gameOver = true;
            const winner = this.currentPlayer === 'white' ? 'Black' : 'White';
            this.updateStatus(`${winner} wins! 🎉`);
        } else if (this.isStalemate()) {
            this.gameOver = true;
            this.updateStatus("It's a draw! 🤝");
        }
    }
    
    getValidMoves(row, col) {
        const piece = this.board[row][col];
        if (!piece) return [];
        
        const moves = [];
        
        switch (piece.type) {
            case 'pawn':
                moves.push(...this.getPawnMoves(row, col));
                break;
            case 'rook':
                moves.push(...this.getRookMoves(row, col));
                break;
            case 'knight':
                moves.push(...this.getKnightMoves(row, col));
                break;
            case 'bishop':
                moves.push(...this.getBishopMoves(row, col));
                break;
            case 'queen':
                moves.push(...this.getQueenMoves(row, col));
                break;
            case 'king':
                moves.push(...this.getKingMoves(row, col));
                break;
        }
        
        return moves;
    }
    
    getPawnMoves(row, col) {
        const moves = [];
        const piece = this.board[row][col];
        const direction = piece.color === 'white' ? -1 : 1;
        const startRow = piece.color === 'white' ? 6 : 1;
        
        // Forward move
        const newRow = row + direction;
        if (newRow >= 0 && newRow < 8 && !this.board[newRow][col]) {
            moves.push({ row: newRow, col });
            
            // Double move from starting position
            if (row === startRow && !this.board[newRow + direction][col]) {
                moves.push({ row: newRow + direction, col });
            }
        }
        
        // Diagonal captures
        const diagonals = [{ row: newRow, col: col - 1 }, { row: newRow, col: col + 1 }];
        diagonals.forEach(pos => {
            if (pos.row >= 0 && pos.row < 8 && pos.col >= 0 && pos.col < 8) {
                const targetPiece = this.board[pos.row][pos.col];
                if (targetPiece && targetPiece.color !== piece.color) {
                    moves.push(pos);
                }
            }
        });
        
        return moves;
    }
    
    getRookMoves(row, col) {
        return this.getLinearMoves(row, col, [
            { dr: -1, dc: 0 }, // Up
            { dr: 1, dc: 0 },  // Down
            { dr: 0, dc: -1 }, // Left
            { dr: 0, dc: 1 }   // Right
        ]);
    }
    
    getKnightMoves(row, col) {
        const moves = [];
        const piece = this.board[row][col];
        const knightMoves = [
            { dr: -2, dc: -1 }, { dr: -2, dc: 1 },
            { dr: -1, dc: -2 }, { dr: -1, dc: 2 },
            { dr: 1, dc: -2 }, { dr: 1, dc: 2 },
            { dr: 2, dc: -1 }, { dr: 2, dc: 1 }
        ];
        
        knightMoves.forEach(move => {
            const newRow = row + move.dr;
            const newCol = col + move.dc;
            
            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const targetPiece = this.board[newRow][newCol];
                if (!targetPiece || targetPiece.color !== piece.color) {
                    moves.push({ row: newRow, col: newCol });
                }
            }
        });
        
        return moves;
    }
    
    getBishopMoves(row, col) {
        return this.getLinearMoves(row, col, [
            { dr: -1, dc: -1 }, // Up-left
            { dr: -1, dc: 1 },  // Up-right
            { dr: 1, dc: -1 },  // Down-left
            { dr: 1, dc: 1 }    // Down-right
        ]);
    }
    
    getQueenMoves(row, col) {
        return [
            ...this.getRookMoves(row, col),
            ...this.getBishopMoves(row, col)
        ];
    }
    
    getKingMoves(row, col) {
        const moves = [];
        const piece = this.board[row][col];
        
        for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
                if (dr === 0 && dc === 0) continue;
                
                const newRow = row + dr;
                const newCol = col + dc;
                
                if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                    const targetPiece = this.board[newRow][newCol];
                    if (!targetPiece || targetPiece.color !== piece.color) {
                        moves.push({ row: newRow, col: newCol });
                    }
                }
            }
        }
        
        return moves;
    }
    
    getLinearMoves(row, col, directions) {
        const moves = [];
        const piece = this.board[row][col];
        
        directions.forEach(dir => {
            let newRow = row + dir.dr;
            let newCol = col + dir.dc;
            
            while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                const targetPiece = this.board[newRow][newCol];
                
                if (!targetPiece) {
                    moves.push({ row: newRow, col: newCol });
                } else {
                    if (targetPiece.color !== piece.color) {
                        moves.push({ row: newRow, col: newCol });
                    }
                    break;
                }
                
                newRow += dir.dr;
                newCol += dir.dc;
            }
        });
        
        return moves;
    }
    
    isCheckmate() {
        // Simple checkmate detection - check if current player has any valid moves
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.color === this.currentPlayer) {
                    const moves = this.getValidMoves(row, col);
                    if (moves.length > 0) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
    
    isStalemate() {
        // Simple stalemate detection - no valid moves but not in check
        return !this.isCheckmate() && this.getValidMovesForPlayer(this.currentPlayer).length === 0;
    }
    
    getValidMovesForPlayer(player) {
        const moves = [];
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.board[row][col];
                if (piece && piece.color === player) {
                    moves.push(...this.getValidMoves(row, col));
                }
            }
        }
        return moves;
    }
    
    updateStatus() {
        document.getElementById('chess-status').textContent = `${this.currentPlayer.charAt(0).toUpperCase() + this.currentPlayer.slice(1)}'s turn`;
        document.getElementById('chess-turn').textContent = this.currentPlayer.charAt(0).toUpperCase() + this.currentPlayer.slice(1);
    }
    
    updateCapturedCount() {
        document.getElementById('chess-captured').textContent = this.capturedPieces.length;
    }
    
    resetGame() {
        this.board = this.initializeBoard();
        this.currentPlayer = 'white';
        this.selectedPiece = null;
        this.validMoves = [];
        this.gameOver = false;
        this.capturedPieces = [];
        
        this.renderBoard();
        this.updateStatus();
        this.updateCapturedCount();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ChessGame();
}); 