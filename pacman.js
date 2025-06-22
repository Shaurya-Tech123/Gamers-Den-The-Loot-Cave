class PacmanGame {
    constructor() {
        this.canvas = document.getElementById('pacman-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.score = 0;
        this.lives = 3;
        this.gameRunning = false;
        
        // Game settings
        this.tileSize = 20;
        this.pacmanSize = 18;
        this.ghostSize = 16;
        this.dotSize = 4;
        this.powerPelletSize = 8;
        
        // Pacman properties
        this.pacman = {
            x: 10 * this.tileSize + this.tileSize / 2,
            y: 15 * this.tileSize + this.tileSize / 2,
            direction: 0, // 0: right, 1: down, 2: left, 3: up
            nextDirection: 0,
            speed: 2,
            mouthAngle: 0,
            mouthDirection: 1
        };
        
        // Ghosts
        this.ghosts = [
            { x: 10 * this.tileSize + this.tileSize / 2, y: 9 * this.tileSize + this.tileSize / 2, direction: 0, color: '#FF0000', speed: 1.5 },
            { x: 9 * this.tileSize + this.tileSize / 2, y: 9 * this.tileSize + this.tileSize / 2, direction: 2, color: '#FFB8FF', speed: 1.3 },
            { x: 11 * this.tileSize + this.tileSize / 2, y: 9 * this.tileSize + this.tileSize / 2, direction: 1, color: '#00FFFF', speed: 1.4 }
        ];
        
        // Game map (0: wall, 1: dot, 2: power pellet, 3: empty)
        this.map = [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0],
            [0,1,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,1,0],
            [0,2,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,2,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,0,0,1,0,1,0,0,0,0,0,0,1,0,1,0,0,1,0],
            [0,1,1,1,1,0,1,1,1,0,0,1,1,1,0,1,1,1,1,0],
            [0,0,0,0,1,0,0,0,3,0,0,3,0,0,0,1,0,0,0,0],
            [0,0,0,0,1,0,1,1,1,1,1,1,1,1,0,1,0,0,0,0],
            [3,3,3,3,1,0,1,0,0,0,0,0,0,1,0,1,3,3,3,3],
            [0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0],
            [0,0,0,0,1,0,1,1,1,1,1,1,1,1,0,1,0,0,0,0],
            [0,0,0,0,1,0,3,0,0,0,0,0,0,3,0,1,0,0,0,0],
            [0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0],
            [0,1,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,1,0],
            [0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0],
            [0,0,1,0,1,0,1,0,0,0,0,0,0,1,0,1,0,1,0,0],
            [0,2,1,1,1,0,1,1,1,0,0,1,1,1,0,1,1,1,2,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        // Add keyboard controls
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // Add button controls
        document.getElementById('pacman-up').addEventListener('click', () => this.setDirection(3));
        document.getElementById('pacman-down').addEventListener('click', () => this.setDirection(1));
        document.getElementById('pacman-left').addEventListener('click', () => this.setDirection(2));
        document.getElementById('pacman-right').addEventListener('click', () => this.setDirection(0));
        
        // Add reset button
        document.getElementById('pacman-reset').addEventListener('click', () => this.resetGame());
        
        this.startGame();
    }
    
    handleKeyPress(e) {
        switch(e.key) {
            case 'ArrowUp':
                this.setDirection(3);
                break;
            case 'ArrowDown':
                this.setDirection(1);
                break;
            case 'ArrowLeft':
                this.setDirection(2);
                break;
            case 'ArrowRight':
                this.setDirection(0);
                break;
        }
    }
    
    setDirection(direction) {
        this.pacman.nextDirection = direction;
    }
    
    startGame() {
        this.gameRunning = true;
        this.gameLoop();
    }
    
    gameLoop() {
        if (!this.gameRunning) return;
        
        this.update();
        this.draw();
        
        requestAnimationFrame(() => this.gameLoop());
    }
    
    update() {
        this.updatePacman();
        this.updateGhosts();
        this.checkCollisions();
        this.checkWinCondition();
    }
    
    updatePacman() {
        // Try to change direction
        if (this.canMove(this.pacman.x, this.pacman.y, this.pacman.nextDirection)) {
            this.pacman.direction = this.pacman.nextDirection;
        }
        
        // Move in current direction
        if (this.canMove(this.pacman.x, this.pacman.y, this.pacman.direction)) {
            switch(this.pacman.direction) {
                case 0: this.pacman.x += this.pacman.speed; break; // Right
                case 1: this.pacman.y += this.pacman.speed; break; // Down
                case 2: this.pacman.x -= this.pacman.speed; break; // Left
                case 3: this.pacman.y -= this.pacman.speed; break; // Up
            }
        }
        
        // Wrap around edges
        if (this.pacman.x < 0) this.pacman.x = this.canvas.width;
        if (this.pacman.x > this.canvas.width) this.pacman.x = 0;
        
        // Animate mouth
        this.pacman.mouthAngle += this.pacman.mouthDirection * 0.2;
        if (this.pacman.mouthAngle > 0.5 || this.pacman.mouthAngle < 0) {
            this.pacman.mouthDirection *= -1;
        }
        
        // Collect dots
        this.collectDot();
    }
    
    updateGhosts() {
        this.ghosts.forEach(ghost => {
            // Simple ghost AI - move randomly when hitting walls
            if (!this.canMove(ghost.x, ghost.y, ghost.direction)) {
                const possibleDirections = [0, 1, 2, 3].filter(dir => 
                    this.canMove(ghost.x, ghost.y, dir)
                );
                if (possibleDirections.length > 0) {
                    ghost.direction = possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
                }
            }
            
            // Move ghost
            switch(ghost.direction) {
                case 0: ghost.x += ghost.speed; break;
                case 1: ghost.y += ghost.speed; break;
                case 2: ghost.x -= ghost.speed; break;
                case 3: ghost.y -= ghost.speed; break;
            }
            
            // Wrap around edges
            if (ghost.x < 0) ghost.x = this.canvas.width;
            if (ghost.x > this.canvas.width) ghost.x = 0;
        });
    }
    
    canMove(x, y, direction) {
        let newX = x, newY = y;
        
        switch(direction) {
            case 0: newX += this.tileSize / 2; break; // Right
            case 1: newY += this.tileSize / 2; break; // Down
            case 2: newX -= this.tileSize / 2; break; // Left
            case 3: newY -= this.tileSize / 2; break; // Up
        }
        
        const gridX = Math.floor(newX / this.tileSize);
        const gridY = Math.floor(newY / this.tileSize);
        
        if (gridX < 0 || gridX >= this.map[0].length || gridY < 0 || gridY >= this.map.length) {
            return false;
        }
        
        return this.map[gridY][gridX] !== 0; // Not a wall
    }
    
    collectDot() {
        const gridX = Math.floor(this.pacman.x / this.tileSize);
        const gridY = Math.floor(this.pacman.y / this.tileSize);
        
        if (gridX >= 0 && gridX < this.map[0].length && gridY >= 0 && gridY < this.map.length) {
            if (this.map[gridY][gridX] === 1) { // Regular dot
                this.map[gridY][gridX] = 3; // Empty
                this.score += 10;
                this.updateScore();
            } else if (this.map[gridY][gridX] === 2) { // Power pellet
                this.map[gridY][gridX] = 3; // Empty
                this.score += 50;
                this.updateScore();
                // TODO: Implement power mode
            }
        }
    }
    
    checkCollisions() {
        this.ghosts.forEach(ghost => {
            const distance = Math.sqrt(
                Math.pow(this.pacman.x - ghost.x, 2) + 
                Math.pow(this.pacman.y - ghost.y, 2)
            );
            
            if (distance < this.pacmanSize + this.ghostSize) {
                this.loseLife();
            }
        });
    }
    
    loseLife() {
        this.lives--;
        this.updateLives();
        
        if (this.lives <= 0) {
            this.gameOver();
        } else {
            this.resetPositions();
        }
    }
    
    resetPositions() {
        // Reset Pacman position
        this.pacman.x = 10 * this.tileSize + this.tileSize / 2;
        this.pacman.y = 15 * this.tileSize + this.tileSize / 2;
        this.pacman.direction = 0;
        this.pacman.nextDirection = 0;
        
        // Reset ghost positions
        this.ghosts[0].x = 10 * this.tileSize + this.tileSize / 2;
        this.ghosts[0].y = 9 * this.tileSize + this.tileSize / 2;
        this.ghosts[1].x = 9 * this.tileSize + this.tileSize / 2;
        this.ghosts[1].y = 9 * this.tileSize + this.tileSize / 2;
        this.ghosts[2].x = 11 * this.tileSize + this.tileSize / 2;
        this.ghosts[2].y = 9 * this.tileSize + this.tileSize / 2;
    }
    
    checkWinCondition() {
        let dotsRemaining = 0;
        for (let row of this.map) {
            for (let cell of row) {
                if (cell === 1 || cell === 2) dotsRemaining++;
            }
        }
        
        if (dotsRemaining === 0) {
            this.win();
        }
    }
    
    gameOver() {
        this.gameRunning = false;
        document.getElementById('pacman-status').textContent = 'Game Over! 😵';
    }
    
    win() {
        this.gameRunning = false;
        document.getElementById('pacman-status').textContent = 'You Win! 🎉';
    }
    
    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw map
        this.drawMap();
        
        // Draw Pacman
        this.drawPacman();
        
        // Draw ghosts
        this.drawGhosts();
    }
    
    drawMap() {
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                const cellX = x * this.tileSize;
                const cellY = y * this.tileSize;
                
                switch(this.map[y][x]) {
                    case 0: // Wall
                        this.ctx.fillStyle = '#0000FF';
                        this.ctx.fillRect(cellX, cellY, this.tileSize, this.tileSize);
                        break;
                    case 1: // Dot
                        this.ctx.fillStyle = '#FFFF00';
                        this.ctx.beginPath();
                        this.ctx.arc(cellX + this.tileSize/2, cellY + this.tileSize/2, this.dotSize, 0, Math.PI * 2);
                        this.ctx.fill();
                        break;
                    case 2: // Power pellet
                        this.ctx.fillStyle = '#FFFF00';
                        this.ctx.beginPath();
                        this.ctx.arc(cellX + this.tileSize/2, cellY + this.tileSize/2, this.powerPelletSize, 0, Math.PI * 2);
                        this.ctx.fill();
                        break;
                }
            }
        }
    }
    
    drawPacman() {
        this.ctx.fillStyle = '#FFFF00';
        this.ctx.beginPath();
        
        const startAngle = this.pacman.direction * Math.PI / 2 + this.pacman.mouthAngle;
        const endAngle = this.pacman.direction * Math.PI / 2 - this.pacman.mouthAngle;
        
        this.ctx.arc(this.pacman.x, this.pacman.y, this.pacmanSize, startAngle, endAngle);
        this.ctx.lineTo(this.pacman.x, this.pacman.y);
        this.ctx.fill();
    }
    
    drawGhosts() {
        this.ghosts.forEach(ghost => {
            this.ctx.fillStyle = ghost.color;
            this.ctx.beginPath();
            this.ctx.arc(ghost.x, ghost.y, this.ghostSize, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    updateScore() {
        document.getElementById('pacman-score').textContent = this.score;
    }
    
    updateLives() {
        document.getElementById('pacman-lives').textContent = this.lives;
    }
    
    resetGame() {
        this.score = 0;
        this.lives = 3;
        this.gameRunning = true;
        
        // Reset map
        this.map = [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0],
            [0,1,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,1,0],
            [0,2,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,2,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,1,0,0,1,0,1,0,0,0,0,0,0,1,0,1,0,0,1,0],
            [0,1,1,1,1,0,1,1,1,0,0,1,1,1,0,1,1,1,1,0],
            [0,0,0,0,1,0,0,0,3,0,0,3,0,0,0,1,0,0,0,0],
            [0,0,0,0,1,0,1,1,1,1,1,1,1,1,0,1,0,0,0,0],
            [3,3,3,3,1,0,1,0,0,0,0,0,0,1,0,1,3,3,3,3],
            [0,0,0,0,1,0,1,0,0,0,0,0,0,1,0,1,0,0,0,0],
            [0,0,0,0,1,0,1,1,1,1,1,1,1,1,0,1,0,0,0,0],
            [0,0,0,0,1,0,3,0,0,0,0,0,0,3,0,1,0,0,0,0],
            [0,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,1,0],
            [0,1,0,0,1,0,0,0,1,0,0,1,0,0,0,1,0,0,1,0],
            [0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0],
            [0,0,1,0,1,0,1,0,0,0,0,0,0,1,0,1,0,1,0,0],
            [0,2,1,1,1,0,1,1,1,0,0,1,1,1,0,1,1,1,2,0],
            [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ];
        
        this.resetPositions();
        this.updateScore();
        this.updateLives();
        document.getElementById('pacman-status').textContent = 'Use arrow keys to move';
        
        this.startGame();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PacmanGame();
}); 