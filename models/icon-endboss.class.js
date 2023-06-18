class IconEndBoss extends DrawableObject {
    
    IMAGES_ICON = [
        `../img/7_statusbars/3_icons/icon_health_endboss.png`
    ]

    otherDirection = true;

    constructor() {
        super().loadImage(this.IMAGES_ICON[0]);
        this.loadImages(this.IMAGES_ICON);
        this.x = 665;
        this.y = 8;
        this.width = 52;
        this.height = 52;
    }
}