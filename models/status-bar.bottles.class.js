/**
 * Represents a status bar for bottles in the game, extending DrawableObject.
 */
class StatusbarBottles extends DrawableObject{

    bottleAmount = 0;
    percentage=0;

    IMAGES_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ]; 
    
    /**
     * Constructor for the StatusbarBottles class. Initializes the status bar with default values.
     */
    constructor () {
        super();
        this.loadImages(this.IMAGES_BOTTLES);
        this.x= 20;
        this.y= 50;
        this.width=200;
        this.height=60;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage of the status bar based on the current amount of bottles collected.
     * @param {number} percentage - The percentage to set for the status bar.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_BOTTLES[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];   
    }

    /**
     * Increments the count of collected bottles and updates the status bar.
     */
    collectBottle() {
        this.bottleAmount++;
        if (this.bottleAmount > 5) {
            this.bottleAmount = 5; 
        }
        this.updatePercentage();
    }

    /**
     * Updates the percentage of the status bar based on the amount of bottles collected.
     */
    updatePercentage() {
        this.percentage = this.bottleAmount * 20; 
        this.setPercentage(this.percentage);
    }

    /**
     * Resolves the index of the image to display based on the current percentage.
     * @returns {number} The index of the image in the IMAGES_BOTTLES array.
     */
    resolveImageIndex() {
        return Math.min(Math.floor(this.percentage / 20), 5);
    }

}
