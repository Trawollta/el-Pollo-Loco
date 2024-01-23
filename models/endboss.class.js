/**
 * Represents the endboss in the game, extending MovableObject with specific properties and behaviors.
 */
class Endboss extends MovableObject {

    isDead = false; 
    height= 420;
    width = 270;
    //y= 10;
    offset= {x: 10, y: 10, width: -20, height: -30};
    energy = 100;
    firstContact= false;
    endbossAlerted = false; 
    inDamageState = false;
    hitCount = 0; 
    aggressive = false;
    isHitByBottle = false;
    aggressiveMoveSpeed = 2;
    isJumping = false;
    jumpInterval = null;
    maxEnergy = 100; // Maximalenergie des Endbosses
    damagePerHit = 20;

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_IDLE = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'    
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'    
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'   
    ];

    /**
     * Constructor for the Endboss class, initializes properties, loads images, and sets up animations.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.x = 4600;
        this.y = 40;
        this.energy = 100;
        this.speed = 2;
        this.animateEndboss();
        this.animate();
        this.groundLevel = 40;
    }

    enterRoom() {
        this.isEntering = true;
        this.startContinuousMovement();
    }
    
    startContinuousMovement() {
        this.movementInterval = setInterval(() => {
            this.moveLeft(); 
            this.playAnimation(this.IMAGES_WALKING);

            if (!this.isJumping) {
                this.jump();
            }
        }, 1000 / 30);
    }

    
    jump() {
        if (!this.isJumping) {
            this.isJumping = true;
            this.speedY = 20;
    
            const moveUp = () => {
                if (this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= 2;
                    requestAnimationFrame(moveUp);
                } else {
                    this.fall();
                }
            };
    
            moveUp();
        }
    }
    
    fall() {
        if (this.y < this.groundLevel) {
            this.speedY += 0.5;
            this.y += this.speedY;
            requestAnimationFrame(() => this.fall());
        } else {
            this.isJumping = false;
            this.y = this.groundLevel;
            this.speedY = 0;
        }
    }
    
    animate() {
        setInterval(() => {
            if (this.isDead) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.aggressive) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (this.inDamageState) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isEntering) {
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }
    

    playAnimation(images) {
        let index = Math.floor(this.currentImage % images.length);
        let path = images[index];
        this.img = this.imageCache[path]; 
        this.currentImage += 0.5;
    }
    
    /**
     * Handles the behavior when the endboss is hit by a bottle.
     */
    receiveHitByBottle() {
        this.energy -= this.damagePerHit;
        if (this.energy <= 0) {
            this.isDead = true;
            this.playAnimation(this.IMAGES_DEAD);
        } else {
            this.inDamageState = true;
            this.playAnimation(this.IMAGES_HURT);
            playAudio(endbossHurtSound);
    
            setTimeout(() => {
                this.inDamageState = false;
                if (!this.isDead) {
                    this.playAnimation(this.IMAGES_WALKING); 
                }
            }, 1000); 
        }
    }
    
    
    bossIsHurt() {
        this.inDamageState = true;
        this.playAnimation(this.IMAGES_HURT);
        playAudio(endbossHurtSound);
        setTimeout(() => {
            this.inDamageState = false;
            if (!this.isDead) {
                this.animateEndboss();
            }
        }, 1000); 
    }
    
    animateEndboss() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }

        const animate = () => {
            this.animationFrameId = requestAnimationFrame(animate);
        };

        this.animationFrameId = requestAnimationFrame(animate);
    }

    stopActions() {
        clearInterval(this.movementInterval); // Stoppt die kontinuierliche Bewegung
        cancelAnimationFrame(this.animationFrameId); // Stoppt die Animation
    }

}