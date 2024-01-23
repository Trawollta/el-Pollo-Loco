/**
 * Manages keyboard and touch input for the game, setting flags for different actions.
 */
class Keyboard {

    LEFT = false;
    RIGHT = false;
    SPACE = false;
    D = false;

    /**
     * Constructor for the Keyboard class. Initializes input flags and binds event listeners.
     */
    constructor() {
        this.bindKeyPressEvents();
        this.bindTouchPressEvents();
    }
    /**
     * Binds key press event listeners to the window for keyboard controls.
     */
    bindKeyPressEvents() {
        window.addEventListener('keydown', (e) => {
            this.handleKeyPress(e.keyCode, true);
        });

        window.addEventListener('keyup', (e) => {
            this.handleKeyPress(e.keyCode, false);
        });
    }
    /**
     * Binds touch event listeners to specified buttons for mobile controls.
     */
    bindTouchPressEvents() {
        this.addTouchEvent('btnLeft', 'LEFT');
        this.addTouchEvent('btnRight', 'RIGHT');
        this.addTouchEvent('btnJump', 'SPACE');
        this.addTouchEvent('btnThrow', 'D');
    }

    addTouchEvent(buttonId, action) {
        const button = document.getElementById(buttonId);
        if (button) {
            button.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this[action] = true;
            });
            button.addEventListener('touchend', (e) => {
                e.preventDefault();
                this[action] = false;
            });
        } else {
        
        }
    }
    /**
     * Handles key press events and sets the appropriate action flags.
     * @param {number} keyCode - The keycode of the pressed key.
     * @param {boolean} isPressed - True if the key is pressed, false if released.
     */
    handleKeyPress(keyCode, isPressed) {
        switch (keyCode) {
            case 37: 
                this.LEFT = isPressed;
                break;
            case 39: 
                this.RIGHT = isPressed;
                break;
            case 32: 
                this.SPACE = isPressed;
                break;
            case 68: 
                this.D = isPressed;
                break;
        }
    }
}
