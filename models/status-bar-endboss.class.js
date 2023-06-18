class StatusBarEndBoss extends DrawableObject {
    IMAGES = IMAGES.statusBarEndBoss.IMAGES;

    percentage = 100;
    otherDirection = true;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 512;
        this.y = 0;
        this.width = 198;
        this.height = 52;
        this.setPercentage(100);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if(this.percentage == 100) {
            return 5;
        } else if(this.percentage > 80) {
            return 4;
        } else if(this.percentage > 60) {
            return 3;
        } else if(this.percentage > 40) {
            return 2;
        } else if(this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }

}