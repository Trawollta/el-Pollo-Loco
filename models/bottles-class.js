/**
 * Represents a bottle object in the game, with properties for movement and animation.
 */
class Bottles extends MovableObject {

    height = 60;
    width = 60;
    collected = false;
    moveSpeed = 0.5; 
    moveDirection = 1;
    moveDistance = 100;
    lastImageChange = 0;
    imageChangeInterval = 200;
    offset = {x: 10, y: 10, width: -20, height: -30};
    
    
    IMAGES_SALSABOTTLE =[
        'img/6_salsa_bottle/salsa_bottle.png'
    ];

    IMAGES_SALSABOTTLE_GROUND = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    IMAGES_SPLASH= [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png'
    
    ];
    
    /**
     * Constructs a new bottle object.
     * @param {number} x - The initial x-coordinate of the bottle.
     */
    constructor(x) {
        super().loadImage(this.IMAGES_SALSABOTTLE_GROUND[0]);
        this.loadImages(this.IMAGES_SALSABOTTLE_GROUND);
        this.x = x;
        this.y = 350;
        this.initialX = this.x;
        this.currentImageIndex = 0;
        setInterval(() => {
            this.playAnimation(this.IMAGES_SALSABOTTLE_GROUND);
        }, this.imageChangeInterval);
    }
/**
 * Animates the bottle by moving it and playing its ground animation
 */
    animate() {
        this.move();
        this.playAnimation(this.IMAGES_SALSABOTTLE_GROUND);
    }
/**
 * Moves the bottle horizontally within a set distance, reversing direction at boundaries
 */
    move() {
        this.x += this.moveSpeed * this.moveDirection;
        if (this.x > this.initialX + this.moveDistance || this.x < this.initialX - this.moveDistance) {
            this.moveDirection *= -1;
        }
    }
/** 
 * Cycles through a set of images to create an animation effect.
     * @param {string[]} images - An array of image paths for the animation.
*/
    playAnimation(images) {
        let i = this.currentImageIndex % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImageIndex++;
    }
}




