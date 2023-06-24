class Bottle extends DrawableObject {
    width = 60;
    height = 60;
    offset = {
        top: 20,
        bottom: 20,
        left: 10,
        right: 10
    }
    
    constructor(imagePath, y) {
        super().loadImage(imagePath);
        this.x = 300 + Math.random() * 3000;
        this.y = y;
    }
}