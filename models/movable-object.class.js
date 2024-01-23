class MovableObject extends DrawableObject{

    speed = 0.15;
    otherDirection = false;
    speedY= 0;
    acceleration= 2.5;
    energy = 100; 
    lastHit=0;
    offset;

    
    /**
     * Applies gravity to the object, affecting its vertical movement.
     */
    applyGravity(){
        setInterval(() => {
            if (this.isAboveGround()|| this.speedY > 0) {
                this.y -=this.speedY; 
                this.speedY -= this.acceleration;
            }
        }, 1000/25);
    }

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if the object is above the ground.
     */
    isAboveGround(){
        if (this instanceof ThrowableObject){
        return true;
        } else {
        return this.y < 180;
        }
    }
    
    /**
     * Checks for collision between this object and another object.
     * @param {MovableObject} obj - The object to check for collision with.
     * @returns {boolean} True if there is a collision.
     */
    isColliding(obj) {
        let hitboxThis = {
            x: this.x + this.offset.x,
            y: this.y + this.offset.y,
            width: this.width + this.offset.width,
            height: this.height + this.offset.height
        };

        let hitboxObj = {
            x: obj.x + obj.offset.x,
            y: obj.y + obj.offset.y,
            width: obj.width + obj.offset.width,
            height: obj.height + obj.offset.height
        };

            return  hitboxThis.x < hitboxObj.x + hitboxObj.width && hitboxThis.x + hitboxThis.width > hitboxObj.x &&
                    hitboxThis.y < hitboxObj.y + hitboxObj.height && hitboxThis.height + hitboxThis.y > hitboxObj.y;
    }

    /**
     * Applies damage to the object and updates its last hit time.
     */
    hit() {
    let currentTime = new Date().getTime();
        if (currentTime - this.lastHit > 1000) { 
            let damage = 25;
            this.energy -= damage;
            if (this.energy < 0) {
                this.energy = 0;
            }
            this.lastHit = currentTime;
        }
    }

    /**
     * Checks if the object has been hurt recently.
     * @returns {boolean} True if the object is hurt.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.5;
    }

    /**
     * Checks if the object is dead (energy has reached zero).
     * @returns {boolean} True if the object is dead.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Moves the object to the right by a set speed.
     */
    moveRight() {
        if (this.x < 4900) {
            this.x += this.speed;
        }
    }

    /**
     * Moves the object to the left by a set speed.
     */
    moveLeft(){
        this.x -= this.speed;
    }

    /**
     * Causes the object to jump by setting its vertical speed.
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * Cycles through a set of images to create an animation effect.
     * @param {string[]} images - An array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;   
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++
    }

}