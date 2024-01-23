/**
 * Represents the health status bar of the endboss in the game, extending MovableObject.
 */
class StatusbarEndboss extends MovableObject {

    percentage = 100;

    IMAGES_HEALTHBOSS = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    /**
     * Constructor for the StatusbarEndboss class. Initializes the health bar with default values and images.
     */
    constructor () {
        super();
        this.loadImages(this.IMAGES_HEALTHBOSS);
        this.x = 480;
        this.y = 40;
        this.width = 200;
        this.height = 50;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage of the health bar based on the endboss's current health.
     * @param {number} percentage - The percentage of health remaining for the endboss.
     */
    // setPercentage(percentage) {
    //     this.percentage = percentage;
    //     let path = this.IMAGES_HEALTHBOSS[this.resolveImageIndex(percentage)];
    //     this.img = this.imageCache[path];   

    // }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTHBOSS[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(percentage) {
        if (percentage > 80) return 5;
        else if (percentage > 60) return 4;
        else if (percentage > 40) return 3;
        else if (percentage > 20) return 2;
        else if (percentage > 0) return 1;
        return 0; // 0 Prozent, wenn der Endboss besiegt ist
    }

    
}
