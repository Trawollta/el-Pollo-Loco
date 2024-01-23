/**
 * Represents a coin object in the game, extending MovableObject with properties for animation.
 */
class Coins extends MovableObject {

    height= 110;
    width= 110;
    x=200;
    y=200;
    offset= {x: 10 , y: 10, width: -20, height: -30};

    IMAGES_COINS =[
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    
    /**
     * Constructs a new coin object.
     * @param {number} x - The initial x-coordinate of the coin.
     */
    constructor(x) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.IMAGES_COINS);
        this.x=x;
        this.speed = 0.10 + Math.random() *0.25;
        this.animateCoins();
    }

    /**
     * Animates the coin by cycling through a set of images.
     */
    animateCoins() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_COINS);
        }, 1000/3);
    }

    /**
     * Marks the coin as collected.
     */
    collect() {
        this.collected = true;
    }
}