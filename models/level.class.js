class Level {
    enemies;
    clouds;
    backgroundObjects;
    air;
    levelEndX = 2157;
    constructor(enemies, clouds, backgroundObjects, air) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.air = air;
    }
}