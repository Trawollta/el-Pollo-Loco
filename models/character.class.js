/**
 * Represents the main character in the game, with properties and methods for movement, animation, and game state.
 */
class Character extends MovableObject{

    height= 250;
    width= 100;
    y= 180;
    x= 100;
    speed=10;
    energy= 100;
    offset= {x: 20, y: 110, width: -50, height: -100};
    idleTime= new Date().getTime();
    killed=false;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [ 
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'     
    ];

    world;

    /**
     * Constructor for the Character class, initializes properties, loads images, applies gravity, and sets up animations.
     */
    constructor() {
    
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEPING);
        this.applyGravity();
        this.animate();
    }

    /**
     * Handles the animation loop of the character, including death checks and movement animations.
     */

    animate(){

        setInterval(() => {
            this.checkIfDead();
        }, 50);


    setInterval(() => {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            playAudio(walkingSound); 
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection= true;
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            playAudio(jumpSound); 
        }
            this.world.camera_x = -this.x + 100;
    
    }, 1000/60);

    setInterval(() => {
        const currentTime = new Date().getTime();
        const timeSinceLastMove = currentTime - this.idleTime;

        if (this.isDead()){
            this.playAnimation(this.IMAGES_DEAD);
        } else if (this.isHurt()){
            this.playAnimation(this.IMAGES_HURT);
            playAudio(getHurtSound);
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);    
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
            this.idleTime = currentTime;
        } else if (timeSinceLastMove > 5000) { 
            this.playAnimation(this.IMAGES_SLEEPING);
        } else if (!this.isAboveGround()) { 
            this.playAnimation(this.IMAGES_IDLE);
        }
    }, 1000/10);
    }

    /**
     * Causes the character to jump.
     */
    jump() {
        this.speedY = 30;
        this.idleTime = new Date().getTime(); // Zurücksetzen der idleTime beim Springen
    }

    /**
     * Checks if the character's energy level has reached zero and handles the character's death.
     */
    checkIfDead() {
        if (this.energy <= 0) {
            this.killed = true;
            this.playAnimation(this.IMAGES_DEAD);
            showEndScreen();
            stopAllSounds();
        }
    }

}