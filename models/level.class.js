class Level {
    enemies;
    clouds;
    backgroundObjects;
    air;
    levelEndX = 4188;
    levelStartX = -770;
    constructor(enemies, clouds, backgroundObjects, air) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.air = air;
    }
}