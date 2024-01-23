let canvas;
let world;
let keyboard;

/**
 * Initializes the game, hides the start screen and start button.
 */
function startGame() {
    init();
    document.getElementById('startScreen').style.display = 'none'; 
    document.getElementById('start-game-button').style.display = 'none';
    
    
}
/**
 * Displays the start screen
 */
function showStartScreen() {
    document.getElementById('startScreen').style.display = 'flex';
}
/**
 * Handles the end of the game, hides the start game button, and shows the end screen.
 */
function endGame() {
    document.getElementById('start-game-button').style.display = 'none'; 
    showEndScreen();
}

/**
 * Handles the winning scenario of the game, displays the win screen, and hides the start game button.
 */
function winGame() {
    document.getElementById('winScreen').style.display = 'block';
    document.getElementById('start-game-button').style.display = 'none';
    clearAllIntervals();
}

function backToMenu() {
    clearAllIntervals(); 
    document.getElementById('winScreen').style.display = 'none'; 
    document.getElementById('startScreen').style.display = 'flex'; 
    document.getElementById('start-game-button').style.display = 'block'; 
}

/**
 * Displays the end screen and handles the UI changes when the game ends.
 */
function showEndScreen() {
    document.getElementById('endScreen').style.display = 'flex';
    document.getElementById('start-game-button').style.display = 'none'; 
    document.getElementById('restartButton').style.display = 'block'; 
    
}

/**
 * Restarts the game by clearing all intervals, hiding the end screen, and displaying the start screen and button.
 *
 */
function restartGame() {
    clearAllIntervals(); 
    document.getElementById('endScreen').style.display = 'none'; 
    document.getElementById('startScreen').style.display = 'flex'; 
    document.getElementById('start-game-button').style.display = 'block'; 
}

/**
 * Clears all set intervals in the window, effectively stopping all recurring actions in the game.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Initializes the game by setting up the level, canvas, keyboard, and world objects, and showing the start screen.
 */
function init() {
    initLevel();
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();
    world = new World(canvas, keyboard, endGame, winGame);
    showStartScreen();
    setupMobileControls();
    soundActive = false;
    updateAllSounds();
    updateSoundButtonIcon();
}

/**
 * Sets up mobile controls for the game, allowing touch input for movement and actions.
 *
 */
function setupMobileControls() {
    const btnLeft = document.getElementById('btnLeft');
    const btnRight = document.getElementById('btnRight');
    const btnJump = document.getElementById('btnJump');
    const btnThrow = document.getElementById('btnThrow');

    btnLeft.addEventListener('touchstart', () => {
        
        keyboard.LEFT = true;
    });
    btnLeft.addEventListener('touchend', () => {
        keyboard.LEFT = false;
    });

    btnRight.addEventListener('touchstart', () => {
        keyboard.RIGHT = true;
    });
    btnRight.addEventListener('touchend', () => {
        keyboard.RIGHT = false;
    });

    btnJump.addEventListener('touchstart', () => {
        keyboard.SPACE = true;
    });
    btnJump.addEventListener('touchend', () => {
        keyboard.SPACE = false;
    });

    btnThrow.addEventListener('touchstart', () => {
        keyboard.D = true;
    });
    btnThrow.addEventListener('touchend', () => {
        keyboard.D = false;
    });
}
/**
 * Event listener for keydown events to handle keyboard inputs for game controls.
 */
window.addEventListener("keydown", (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if(e.keyCode == 38) {
        keyboard.UP = true;
    }
    if(e.keyCode == 39) {
        keyboard.DOWN = true;
    }
    window.addEventListener("keydown", (e) => {
        if(e.keyCode == 32) { 
            e.preventDefault(); 
            keyboard.SPACE = true;
            if (soundActive) {
                playAudio(jumpSound);
            }
        }
    });
    if(e.keyCode == 68) {
        keyboard.D= true;
    }    
});
/**
 * Event listener for keyup events to update the game state when keys are released.
 */
window.addEventListener("keyup", (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if(e.keyCode == 38) {
        keyboard.UP = false;
    }
    if(e.keyCode == 39) {
        keyboard.DOWN = false;
    }
    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if(e.keyCode == 68) {
        keyboard.D= false;
    }
});

/**
 * Toggles the fullscreen mode for the game.
 */
function toggleFullScreen() {
    let elem = document.getElementById("game-container"); 

    if (!document.fullscreenElement) {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.mozRequestFullScreen) { 
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) { 
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { 
            elem.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) { 
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) { 
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { 
            document.msExitFullscreen();
        }
    }
}

