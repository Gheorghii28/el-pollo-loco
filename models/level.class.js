class Level {
    enemies;
    clouds;
    backgroundObjects;
    air;
    bottles;
    coins;
    levelEndX = 4188;
    levelStartX = -770;
    constructor(enemies, clouds, backgroundObjects, air, bottles, coins) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.air = air;
        this.bottles = bottles;
        this.coins = coins;
    }
}