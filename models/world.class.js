/**
 * Represents the game world, managing characters, levels, and game state.
 */
class World {

    character = new Character();
    level= level1;
    canvas;
    ctx;
    keyboard;
    camera_x= 0;
    statusBar= new Statusbar();
    bottleBar= new StatusbarBottles();
    coinBar = new StatusbarCoins();
    endbossBar= new StatusbarEndboss();
    throwableObjects= [];
    endbossHurt=false;
    collectedBottles = 0;
    END_BOSS_AREA_X = 4000;
    splashHeight = 350;
    isGameOver = false;

    /**
     * Constructor for the World class, initializes the game world with the given canvas, keyboard, and callbacks.
     * @param {HTMLCanvasElement} canvas - The canvas element for the game.
     * @param {Keyboard} keyboard - The keyboard input handler.
     * @param {function} endGameCallback - Callback function for ending the game.
     * @param {function} winGameCallback - Callback function for winning the game.
     */
    constructor(canvas, keyboard, endGameCallback, winGameCallback) {
        this.ctx= canvas.getContext('2d');
        this.canvas= canvas;
        this.keyboard = keyboard;
        this.endbossBar = new StatusbarEndboss();
        this.draw();
        this.setWorld();
        this.run();
        this.endGameCallback = endGameCallback;
        this.winGameCallback = winGameCallback;
        this.endboss = new Endboss();
    } 
    /**
     * Toggles the sound on or off in the game.
     */
    toggleSound() {
        const soundButton = document.getElementById('sound-button');
        if (music.paused) {
            music.play();
            soundButton.textContent = "Sound Off";
            localStorage.setItem('soundOn', 'true');
        } else {
            music.pause();
            soundButton.textContent = "Sound On";
            localStorage.setItem('soundOn', 'false');
        }
    }

    restoreSoundSettings() {
        const soundOn = localStorage.getItem('soundOn');
        if (soundOn === 'false') {
            music.pause();
            document.getElementById('sound-button').textContent = "Sound On";
        } else {
            music.play();
            document.getElementById('sound-button').textContent = "Sound Off";
        }
    }
    /**
     * Sets the reference of this world in the character object.
     */
    setWorld() {
        this.character.world= this;
    }
    /**
     * Runs the game logic, including collision checks and game state updates.
     */
    run() {
        setInterval(() => {
            this.checkCollisionsWithCoins();
            this.checkCollisionsWithBottles();
            this.checkThrowableObjects();
        }, 100);   

        setInterval(() => {  
            this.ThrowableObjectAttack();
            this.checkJumpOnEnemies();
            this.checkCollisions();
            this.checkCollisionswitdhEndboss();
            this.checkEndbossDeath();
            this.checkCollisionsWithGround();
            this.checkEndbossArea();
        }, 40);
    }

    endGameActions() {
        this.isGameOver = true; // Eine Variable, die anzeigt, dass das Spiel vorbei ist
        this.endboss.stopActions(); // Stoppt alle Aktionen des Endbosses
        // Fügen Sie hier Code ein, um alle anderen Aktionen zu stoppen, z.B. Spielerbewegungen, andere Gegner usw.
    }

    checkEndbossArea() {
        if (this.character.x >= 4100 && !this.level.endboss[0].isEntering) {
            this.enterEndbossArea();
        }
    }
    enterEndbossArea() {
        if (backgroundMusic) {
            backgroundMusic.pause();
        }
        playAudio(endbossMusic); 

        if (this.level.endboss[0]) {
            this.level.endboss[0].enterRoom(); 
        }
    }
    /**
     * Checks for collisions between the character and game objects.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                //debugger;
                this.character.hit(25); 
                this.statusBar.setPercentage(this.character.energy);
    
                if (this.character.energy <= 0) {
                    this.character.checkIfDead(); 
                }
            }
        });
    }
    /**
     * Checks for collisions between the character and Endboss.
     */
    checkCollisionswitdhEndboss() {
        this.level.endboss.forEach((endboss)=> {
            if (this.character.isColliding(endboss)){
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }
    /** 
     * 
     * Checks for collisions between the character and Enemies.
     */
    checkJumpOnEnemies() {
        this.level.enemies.forEach((enemy, index) => { 
            if (this.character.isColliding(enemy)){
                if (this.character.isAboveGround()){
                    this.killChicken(enemy, index);
                }
                else{
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            }
        });
    }
    /** 
     * 
     * Checks if enemy is dead or not.
     */
    killChicken(enemy, index) { 
        enemy.isDead = true;
        this.level.enemies.splice(index, 1);
    }
    
    /** 
     * 
     * Checks the collision between charckter and coins.
     */
    checkCollisionsWithCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.coinBar.collectCoin();
                this.level.coins.splice(index, 1);
                this.coinBar.setPercentage(this.coinBar.coinAmount);
                playAudio(coinCollectSound);
            }
        });
    }

    /** 
     * 
     * Checks the collision between character and bottles.
     */
    checkCollisionsWithBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && this.collectedBottles < 5) {
                this.collectedBottles++;
                this.level.bottles.splice(index, 1);
                this.bottleBar.setPercentage(this.collectedBottles * 20);
                playAudio(bottleCollectSound);
            }
        });
    }

    /**
     * Checks collisions between the character and ground objects.
     */
    checkCollisionsWithGround() {
        this.throwableObjects.forEach((throwableObject, index) => {
            if (throwableObject.y > this.splashHeight && !throwableObject.isBreaking) {
                throwableObject.breakAndSplash();
                playAudio(bottleHitsGroundSound);
            }
            if (throwableObject.animationFinished()) {
                this.throwableObjects.splice(index, 1);
            }
        });
    }

    /**
     * Checks if any throwable objects should be created based on user input and handles their creation.
     */
    checkThrowableObjects() {
        if (this.keyboard.D && this.collectedBottles > 0) {
            let throwableObject = new ThrowableObject(this.character.x, this.character.y);
            this.throwableObjects.push(throwableObject);
            this.lastThrown = Date.now();
            this.collectedBottles--;
            this.bottleBar.setPercentage(this.collectedBottles * 20);
        }
    }

    /**
     * Handles the attack logic for throwable objects.
     */
    ThrowableObjectAttack() {
        this.throwableObjects.forEach((throwableObject, index) => {
            this.level.enemies.forEach((enemy, enemyIndex) => {
                if (throwableObject.isColliding(enemy)) {
                    this.killChicken(enemy);
                    this.throwableObjects.splice(index, 1); 
                }
            });
        
                if (this.level.endboss) {
                    this.level.endboss.forEach((endboss, endbossIndex) => {
                        if (throwableObject.isColliding(endboss)) {
                            this.damageEndboss(endboss);
                            this.throwableObjects.splice(index, 1); 
                        }
                    });
                }
            });
        }

        /**
         * Inflicts damage on the endboss and updates its status.
         * @param {Endboss} endboss - The endboss to inflict damage upon.
         */
        damageEndboss(endboss) {
            endboss.receiveHitByBottle();
            this.endbossBar.setPercentage(endboss.energy);
        
            if (endboss.isDead) {
                endboss.playAnimation(endboss.IMAGES_DEAD);
                playAudio(winSound);
                this.winGameCallback();
            
            }
        }
    
        /**
         * Checks if the endboss is dead and handles the game winning scenario.
         */
        checkEndbossDeath() {
            if (this.level.endboss[0] && this.level.endboss[0].isDead) {
                this.winGameCallback(); 
            }
        }

        /**
         * Draws all objects in the game world onto the canvas.
         */
        draw() {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.translate(this.camera_x, 0);
        
            this.addObjectsToMap(this.level.backgroundObjects);
            this.addObjectsToMap(this.level.clouds);
        
            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.level.bottles);
            this.addObjectsToMap(this.level.coins);
            this.addObjectsToMap(this.throwableObjects);
        
            if (this.level.endboss[0] && (this.level.endboss[0].isEntering || this.level.endboss[0].x < 5000)) {
                this.addToMap(this.level.endboss[0]);
            }
        
            this.ctx.translate(-this.camera_x, 0);
            this.addToMap(this.statusBar);
            this.addToMap(this.bottleBar);
            this.addToMap(this.coinBar);
            this.addToMap(this.endbossBar);
            this.ctx.translate(this.camera_x, 0);
            this.addToMap(this.character);
            this.ctx.translate(-this.camera_x, 0);
        
            let self = this;
            requestAnimationFrame(function() {
                self.draw();
            });
        }
        
        addToMap(mo) {
            if (mo.otherDirection) {
                this.flipImage(mo);
            }
            mo.draw(this.ctx);
            mo.drawFrame(this.ctx);
        
            if (mo.otherDirection) {
                this.flipImageBack(mo);
            }
        }
        
        flipImage(mo) {
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        
        flipImageBack(mo) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
        
        addObjectsToMap(objects) {
            objects.forEach((o) => {
                this.addToMap(o);
            });
        }

    }
        