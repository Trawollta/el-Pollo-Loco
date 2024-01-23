/**
 * Represents a basic drawable object in the game with properties for image handling and rendering.
 */
class DrawableObject {

    img;
    imageCache= {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width= 100;


    /**
     * Loads an image from a given path.
     * @param {string} path - The path to the image file.
     */
    // loadImage(path){
    //     this.img = new Image();
    //     this.img.src = path;
    // }
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the object on the canvas context if an image is loaded.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        if (this.img) {
            //console.log('Drawing Endboss at', this.x, this.y);
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }
    }

    /**
     * Loads multiple images from an array of paths and stores them in an image cache.
     * @param {string[]} arr - An array of image paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img= new Image();
            img.src= path;
            this.imageCache[path] = img;   
        });
    }

    /**
     * Draws a frame around the object for debugging or visual reference, based on its offset values.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    drawFrame(ctx){
        if (this.offset != undefined) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            //ctx.rect(this.x + this.offset.x, this.y+ this.offset.y, this.width + this.offset.width,this.height + this.offset.height);
            ctx.stroke();
        }
    }
}