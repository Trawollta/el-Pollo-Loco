/**
 * Represents a background object in the game. This class extends MovableObject,
 * providing functionality for displaying background images at specific positions.
 * 
 * Background objects are used to create a visual environment in the game, such as
 * scenery or thematic elements.
 */
class BackgroundObject extends MovableObject {

    width= 720;
    height= 480;

     /**
     * Constructs a new BackgroundObject.
     *
     * @param {string} imagePath - The path to the image file used for this background object.
     * @param {number} x - The x-coordinate where the object will be placed on the canvas.
     * @param {number} y - The y-coordinate where the object will be placed on the canvas.
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x= x;
        this.y= 480 - this.height;  
    }

}