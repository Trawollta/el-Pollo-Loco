/**
 * Represents a throwable object in the game, such as a bottle, extending MovableObject with specific behaviors.
 */
class ThrowableObject extends MovableObject {

    isBreaking = false;
    deletable = false;
    offset= {x: 10 , y: 10, width: -20, height: -30};

    IMAGES_ROTATE= [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPLASH= [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',   
    ];

    /**
     * Constructs a new ThrowableObject.
     * @param {number} x - The initial x-coordinate of the throwable object.
     * @param {number} y - The initial y-coordinate of the throwable object.
     */
    constructor (x,y){

        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.loadImages(this.IMAGES_ROTATE);
        this.x= x;
        this.y= y;
        this.height = 60;
        this.width= 50;
        this.trow();
        this.animateBottle();
    }

    /**
     * Initiates the throw motion of the object, applying gravity and horizontal movement.
     */
    trow() {
        this.speedY = 30;
        this.applyGravity();
        let moveInterval = setInterval(() => {
            this.x += 10;
            if (this.deletable) {
                clearInterval(moveInterval);
            }    
        }, 50);
    }

    /**
     * Handles the breaking animation of the object, stopping its movement.
     */
    breakAndSplash() {
        this.isBreaking = true;
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        this.speedY = 0; 
        this.speedX = 0; 
        this.deletable = true;
    }

    /**
     * Checks if the animation of the object has finished.
     * @returns {boolean} True if the animation is finished.
     */
    animationFinished() {
        if (this.IMAGES_SPLASH && this.IMAGES_SPLASH.length > 0) {
            return this.currentImageIndex === this.IMAGES_SPLASH.length - 1;
        }
        return false; 
    }

    /**
     * Handles the rotation animation of the object while it is in the air.
     */
    animateBottle() {
        let animationInterval = setInterval(() => {
            if (!this.isBreaking) {
                this.playAnimation(this.IMAGES_ROTATE);
            } else {
                clearInterval(animationInterval);
            }
        }, 50);
    }
}


