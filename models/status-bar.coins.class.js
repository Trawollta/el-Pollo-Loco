/**
 * Represents a status bar for coins in the game, extending DrawableObject.
 */
class StatusbarCoins extends DrawableObject {

    coinAmount = 0;
    percentage=100;

    IMAGES_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png' 
    ]; 
    
    /**
     * Constructor for the StatusbarCoins class. Initializes the status bar with default values and images.
     */
    constructor () {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.x= 20;
        this.y= 100;
        this.width=200;
        this.height=60;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage of the status bar based on the current amount of coins collected.
     * @param {number} percentage - The percentage to set for the status bar.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_COINS[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }
    
    /**
     * Increments the coin amount and updates the status bar accordingly.
     */
    collectCoin(){
        this.coinAmount += 20;
        if (this.coinAmount > 100) {
            this.coinAmount = 100;
        }
    }
    
    /**
     * Resolves the index of the image to display based on the current coin percentage.
     * @returns {number} The index of the image in the IMAGES_COINS array.
     */
    resolveImageIndex() {
        if (this.percentage == 0 ) {
            return 0;
        } else if (this.percentage == 20) {
            return 1;
        } else if (this.percentage == 40) {
            return 2;
        } else if (this.percentage == 60) {
            return 3;
        } else if (this.percentage == 80) {
            return 4;
        } else if (this.percentage == 100) {
            return 5;
        }
        return Math.min(Math.floor(this.percentage / 20), this.IMAGES_COINS.length - 1);
    }
}