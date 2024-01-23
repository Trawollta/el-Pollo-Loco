/**
 * Represents a smaller chicken enemy in the game, extending MovableObject with specific properties and animations.
 */

class Smallchicken extends MovableObject {

    y=360;
    height= 55;
    width= 55; 
    offset= {x: 10 , y: 10, width: -20, height: -30};
    isDead= false;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Constructs a new Smallchicken object.
     * @param {number} x - The initial x-coordinate of the small chicken.
     */
    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD); 
        this.x= x;
        this.speed = 0.10 + Math.random() *0.25;
        this.animate();
    }

    /**
     * Handles the animation loop of the small chicken, including moving and playing walking animations.
     */
    animate(){
        setInterval(() => {
            this.moveLeft();
        },1000/ 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200);
    }
}

