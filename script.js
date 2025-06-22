// Global variables
let currentGame = null;
let gameInstances = {
    tictactoe: null,
    pacman: null,
    chess: null
};
let isDarkTheme = true;

// DOM elements
const navButtons = document.querySelectorAll('.nav-btn');
const games = document.querySelectorAll('.game');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const themeToggle = document.getElementById('theme-toggle');
const gameCards = document.querySelectorAll('.game-card');
const playButtons = document.querySelectorAll('.play-btn');
const notificationContainer = document.getElementById('notification-container');
const loadingOverlay = document.getElementById('loading-overlay');

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    setupGameNavigation();
    setupMainNavigation();
    setupEventListeners();
    setupGameCards();
    setupThemeToggle();
    startBackgroundAnimation();
    loadUserPreferences();
});

// Initialize website functionality
function initializeWebsite() {
    // Add smooth scrolling to navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll effects
    setupScrollEffects();
    
    // Setup footer links
    setupFooterLinks();
}

// Setup main navigation (Home, Games, About, Contact)
function setupMainNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            switchSection(targetId);
        });
    });

    // Setup hamburger menu for mobile
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Initialize with Home section
    switchSection('home');
}

// Switch between main sections
function switchSection(sectionId) {
    // Update navigation links
    navLinks.forEach(link => link.classList.remove('active'));
    document.querySelector(`[href="#${sectionId}"]`).classList.add('active');

    // Hide all sections
    sections.forEach(section => section.classList.remove('active'));

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.add('active');

    // If switching to games, initialize games if needed
    if (sectionId === 'games') {
        if (!currentGame) {
            switchGame('tictactoe');
        }
    }
}

// Setup game cards
function setupGameCards() {
    gameCards.forEach(card => {
        card.addEventListener('click', () => {
            const gameType = card.getAttribute('data-game');
            switchSection('games');
            setTimeout(() => {
                switchGame(gameType);
            }, 300);
        });
    });

    // Setup play buttons
    playButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = button.closest('.game-card');
            const gameType = card.getAttribute('data-game');
            switchSection('games');
            setTimeout(() => {
                switchGame(gameType);
            }, 300);
        });
    });
}

// Setup game navigation
function setupGameNavigation() {
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            const gameType = button.getAttribute('data-game');
            switchGame(gameType);
        });
    });

    // Initialize with Tic Tac Toe
    switchGame('tictactoe');
}

// Switch between games
function switchGame(gameType) {
    // Show loading overlay
    showLoadingOverlay();

    // Update navigation buttons
    navButtons.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-game="${gameType}"]`).classList.add('active');

    // Hide all games
    games.forEach(game => game.classList.remove('active'));

    // Show selected game
    const selectedGame = document.getElementById(gameType);
    selectedGame.classList.add('active');

    // Initialize the game if not already done
    if (!gameInstances[gameType]) {
        initializeGame(gameType);
    }

    // Update current game
    currentGame = gameType;

    // Hide loading overlay after a short delay
    setTimeout(() => {
        hideLoadingOverlay();
        showNotification(`Welcome to ${getGameName(gameType)}!`, 'success');
    }, 500);
}

// Get game name for display
function getGameName(gameType) {
    const names = {
        tictactoe: 'Tic Tac Toe',
        pacman: 'Pac-Man',
        chess: 'Chess'
    };
    return names[gameType] || gameType;
}

// Initialize specific game
function initializeGame(gameType) {
    switch(gameType) {
        case 'tictactoe':
            if (!gameInstances.tictactoe) {
                gameInstances.tictactoe = new TicTacToe();
            }
            break;
        case 'pacman':
            if (!gameInstances.pacman) {
                gameInstances.pacman = new PacmanGame();
            }
            break;
        case 'chess':
            if (!gameInstances.chess) {
                gameInstances.chess = new ChessGame();
            }
            break;
    }
}

// Setup theme toggle
function setupThemeToggle() {
    themeToggle.addEventListener('click', () => {
        isDarkTheme = !isDarkTheme;
        updateTheme();
        saveUserPreferences();
    });
}

// Update theme
function updateTheme() {
    const root = document.documentElement;
    
    if (isDarkTheme) {
        root.style.setProperty('--bg-primary', '#0a0a0a');
        root.style.setProperty('--bg-secondary', '#1a1a1a');
        root.style.setProperty('--text-primary', '#ffffff');
        root.style.setProperty('--text-secondary', '#e0e0e0');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        root.style.setProperty('--bg-primary', '#f8f9fa');
        root.style.setProperty('--bg-secondary', '#ffffff');
        root.style.setProperty('--text-primary', '#333333');
        root.style.setProperty('--text-secondary', '#666666');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Setup event listeners
function setupEventListeners() {
    // Window resize handler
    window.addEventListener('resize', handleResize);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);

    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Game control buttons
    setupGameControls();
}

// Setup game controls
function setupGameControls() {
    // Settings button
    const settingsBtn = document.querySelector('.settings-btn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            showNotification('Settings feature coming soon!', 'info');
        });
    }

    // Pause button
    const pauseBtn = document.querySelector('.pause-btn');
    if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
            showNotification('Pause feature coming soon!', 'info');
        });
    }

    // Undo button
    const undoBtn = document.querySelector('.undo-btn');
    if (undoBtn) {
        undoBtn.addEventListener('click', () => {
            showNotification('Undo feature coming soon!', 'info');
        });
    }
}

// Setup footer links
function setupFooterLinks() {
    const footerLinks = document.querySelectorAll('.footer-section a[data-game]');
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const gameType = link.getAttribute('data-game');
            switchSection('games');
            setTimeout(() => {
                switchGame(gameType);
            }, 300);
        });
    });
}

// Handle contact form submission
function handleContactSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Validate form
    if (!name || !email || !subject || !message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Simulate form submission
    showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
    
    // Reset form
    e.target.reset();
}

// Scroll effects
function setupScrollEffects() {
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
        }
    });
}

// Handle window resize
function handleResize() {
    // Recalculate canvas sizes if needed
    if (currentGame === 'pacman' && gameInstances.pacman) {
        // Pacman canvas resize logic if needed
    }
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }

    // Number keys for quick game switching
    if (e.key >= '1' && e.key <= '3') {
        const games = ['tictactoe', 'pacman', 'chess'];
        const gameIndex = parseInt(e.key) - 1;
        if (games[gameIndex]) {
            switchSection('games');
            setTimeout(() => {
                switchGame(games[gameIndex]);
            }, 300);
        }
    }

    // T key for theme toggle
    if (e.key === 't' || e.key === 'T') {
        isDarkTheme = !isDarkTheme;
        updateTheme();
        saveUserPreferences();
    }
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notificationContainer.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
    
    // Remove on click
    notification.addEventListener('click', () => {
        notification.remove();
    });
}

// Show loading overlay
function showLoadingOverlay() {
    loadingOverlay.classList.add('active');
}

// Hide loading overlay
function hideLoadingOverlay() {
    loadingOverlay.classList.remove('active');
}

// Save user preferences
function saveUserPreferences() {
    const preferences = {
        theme: isDarkTheme ? 'dark' : 'light',
        currentGame: currentGame
    };
    localStorage.setItem('gamingDenPreferences', JSON.stringify(preferences));
}

// Load user preferences
function loadUserPreferences() {
    const saved = localStorage.getItem('gamingDenPreferences');
    if (saved) {
        const preferences = JSON.parse(saved);
        isDarkTheme = preferences.theme === 'dark';
        updateTheme();
        
        if (preferences.currentGame) {
            currentGame = preferences.currentGame;
        }
    }
}

// Start background animation
function startBackgroundAnimation() {
    // Animate floating shapes
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach((shape, index) => {
        shape.style.animationDelay = `${index * 1.5}s`;
    });

    // Animate hero stats
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach((stat, index) => {
        const finalValue = stat.textContent;
        const isNumber = !isNaN(finalValue);
        
        if (isNumber) {
            animateNumber(stat, 0, parseInt(finalValue), 2000 + index * 500);
        }
    });
}

// Animate number
function animateNumber(element, start, end, duration) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Save game statistics
function saveStats() {
    const stats = {
        tictactoe: {
            playerWins: parseInt(document.getElementById('player-score')?.textContent || '0'),
            aiWins: parseInt(document.getElementById('ai-score')?.textContent || '0')
        },
        pacman: {
            highScore: parseInt(document.getElementById('pacman-score')?.textContent || '0'),
            lives: parseInt(document.getElementById('pacman-lives')?.textContent || '3')
        },
        chess: {
            gamesPlayed: 0,
            wins: 0
        }
    };
    
    localStorage.setItem('gamingDenStats', JSON.stringify(stats));
    showNotification('Game statistics saved!', 'success');
}

// Show game statistics
function showStats() {
    const saved = localStorage.getItem('gamingDenStats');
    if (saved) {
        const stats = JSON.parse(saved);
        let message = 'Your Gaming Statistics:\n\n';
        
        message += `Tic Tac Toe:\n`;
        message += `  Player Wins: ${stats.tictactoe.playerWins}\n`;
        message += `  AI Wins: ${stats.tictactoe.aiWins}\n\n`;
        
        message += `Pac-Man:\n`;
        message += `  High Score: ${stats.pacman.highScore}\n`;
        message += `  Lives: ${stats.pacman.lives}\n\n`;
        
        message += `Chess:\n`;
        message += `  Games Played: ${stats.chess.gamesPlayed}\n`;
        message += `  Wins: ${stats.chess.wins}`;
        
        alert(message);
    } else {
        showNotification('No statistics found. Play some games first!', 'info');
    }
}

// Export functions for use in game files
window.GamingDen = {
    showNotification,
    saveStats,
    showStats,
    switchGame,
    getGameName
};

// Add some fun easter eggs
document.addEventListener('keydown', (e) => {
    // Konami code easter egg
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        // Track konami code sequence
        if (!window.konamiSequence) {
            window.konamiSequence = [];
        }
        
        window.konamiSequence.push(e.key);
        
        // Check for konami code
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
        
        if (window.konamiSequence.length >= konamiCode.length) {
            const recent = window.konamiSequence.slice(-konamiCode.length);
            if (JSON.stringify(recent) === JSON.stringify(konamiCode)) {
                showNotification('🎉 Konami Code activated! You found an easter egg!', 'success');
                // Add some fun effects
                document.body.style.animation = 'shake 0.5s ease-in-out';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 500);
            }
        }
        
        // Keep only last 8 keys
        if (window.konamiSequence.length > 8) {
            window.konamiSequence = window.konamiSequence.slice(-8);
        }
    }
});

// Add shake animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style); 