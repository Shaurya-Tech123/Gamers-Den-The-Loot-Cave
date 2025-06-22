# Gamers-Den-The-Loot-Cave
In this I have made a website which will be featuring multiplayer and AI based games. The website contain 3 games but in future many more games will be adding in it. A modern, responsive gaming website featuring classic games implemented in Java with a beautiful HTML/CSS/JavaScript frontend.

## 🎮 Games Included

### 1. Tic Tac Toe

- **Language**: Java (Swing GUI)
- **Features**:
  - AI opponent using minimax algorithm
  - Animated X and O drawing
  - Score tracking
  - Responsive design
- **Controls**: Click on empty squares to make moves

### 2. Pac-Man

- **Language**: Java (Swing GUI)
- **Features**:
  - Classic maze layout
  - 4 different ghosts with unique AI behaviors
  - Power pellets and dot collection
  - Multiple levels
  - Lives system
- **Controls**: Arrow keys or WASD for movement

### 3. Chess

- **Language**: Java (Swing GUI)
- **Features**:
  - Complete chess rules implementation
  - Move validation
  - Check and checkmate detection
  - Stalemate detection
  - Pawn promotion
- **Controls**: Click to select pieces and make moves

## 🚀 How to Run

### Option 1: Web Interface (Recommended)

1. Open `index.html` in a modern web browser
2. Navigate through the responsive website
3. Click on any game card to launch the game
4. Enjoy the modern gaming experience!

### Option 2: Standalone Java Applications

#### Prerequisites

- Java Development Kit (JDK) 8 or higher
- Java Runtime Environment (JRE)

#### Compilation and Execution

**For Windows:**

```bash
# Compile all games
javac games/*.java

# Run Tic Tac Toe
java -cp games TicTacToe

# Run Pac-Man
java -cp games Pacman

# Run Chess
java -cp games Chess
```

**For macOS/Linux:**

```bash
# Compile all games
javac games/*.java

# Run Tic Tac Toe
java -cp games TicTacToe

# Run Pac-Man
java -cp games Pacman

# Run Chess
java -cp games Chess
```

## 🎯 Game Features

### Website Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful animations and transitions
- **Game Integration**: Seamless integration between web interface and Java games
- **Score Tracking**: Persistent score and level tracking
- **Sound Controls**: Toggle sound effects on/off
- **Game State Management**: Save and load game progress

### Technical Features

- **Cross-Platform**: Java games run on Windows, macOS, and Linux
- **Object-Oriented Design**: Clean, modular code structure
- **AI Implementation**: Intelligent opponents for strategy games
- **Performance Optimized**: Smooth 60 FPS gameplay
- **Error Handling**: Robust error handling and validation

## 🛠️ Technology Stack

### Frontend

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with animations and responsive design
- **JavaScript**: Interactive functionality and game integration
- **Font Awesome**: Beautiful icons
- **Google Fonts**: Typography (Orbitron, Roboto)

### Backend Games

- **Java**: Core game logic and GUI
- **Swing**: User interface components
- **AWT**: Graphics and event handling
- **Collections Framework**: Data structures for game state

## 📁 Project Structure

```
gaming-den/
├── index.html              # Main website
├── styles.css              # Website styling
├── script.js               # Website functionality
├── games/                  # Java game implementations
│   ├── TicTacToe.java      # Tic Tac Toe game
│   ├── Pacman.java         # Pac-Man game
│   └── Chess.java          # Chess game
└── README.md               # This file
```

## 🎨 Design Features

### Visual Design

- **Dark Theme**: Modern dark color scheme
- **Gradient Backgrounds**: Beautiful color transitions
- **Animated Elements**: Floating icons and smooth transitions
- **Glass Morphism**: Modern UI effects with backdrop blur
- **Responsive Grid**: Adaptive layout for all screen sizes

### User Experience

- **Intuitive Navigation**: Easy-to-use menu system
- **Game Cards**: Attractive game selection interface
- **Real-time Feedback**: Immediate response to user actions
- **Accessibility**: Keyboard shortcuts and screen reader support
- **Mobile Optimized**: Touch-friendly controls

## 🔧 Customization

### Adding New Games

1. Create a new Java class in the `games/` directory
2. Extend `JApplet` and implement necessary interfaces
3. Add a main method for standalone execution
4. Update the website to include the new game
5. Add game card in `index.html`
6. Update game loading logic in `script.js`

### Modifying Existing Games

- **Game Logic**: Modify the core game classes
- **UI Elements**: Update Swing components and styling
- **AI Behavior**: Adjust algorithms in game classes
- **Controls**: Modify event handling and input processing

## 🐛 Troubleshooting

### Common Issues

**Java Games Not Running:**

- Ensure JDK is installed and in PATH
- Check Java version: `java -version`
- Verify compilation: `javac -version`

**Website Not Loading:**

- Use a modern browser (Chrome, Firefox, Safari, Edge)
- Check browser console for JavaScript errors
- Ensure all files are in the correct directory structure

**Performance Issues:**

- Close other applications to free up memory
- Update Java to the latest version
- Check system requirements

## 📱 Browser Compatibility

- **Chrome**: 80+
- **Firefox**: 75+
- **Safari**: 13+
- **Edge**: 80+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Classic game designs and mechanics
- Java Swing framework
- Modern web development community
- Font Awesome for icons
- Google Fonts for typography

---

**Enjoy playing these classic games reimagined for the modern web!** 🎮✨
