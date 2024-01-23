/**
 * Represents a chicken enemy in the game, extending MovableObject with specific properties and animations.
 */
class Chicken extends MovableObject {
    y=360;
    height= 70;
    width= 100;
    offset= {x: 10, y: 10, width: -20, height: -30};
    isDead= false;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Constructs a new Chicken object.
     * @param {number} startX - The initial x-coordinate of the chicken.
     */
    
    constructor(startX) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = startX; 
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    /**
     * Handles the animation loop of the chicken, including moving and playing death animations.
     */
    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);
    
        setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

}