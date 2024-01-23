/**
 * Represents a cloud in the game, extending MovableObject with specific properties for movement.
 */
class Cloud extends MovableObject {
    y= 50;
    width = 500;
    height= 250;


     /**
     * Constructs a new Cloud object.
     * @param {number} xPosition - The initial x-coordinate of the cloud. If not provided, a random value is used.
     */
    constructor(xPosition) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
    
        this.x = xPosition || Math.random() * 500; 
        this.animate();
    }
    /**
     * Animates the cloud by continuously moving it to the left.
     */
    animate() {
        this.moveLeft()
    }

    /**
     * Moves the cloud to the left and resets its position when it moves off-screen.
     */
    moveLeft() {
        setInterval(() => {
            this.x -= 0.15;
            if (this.x < -this.width) {
                this.x = 720; 
            }
        }, 1000 / 60);
    }
}