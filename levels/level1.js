let level1;

function initLevel() {
    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall()
        ],

        [
            new Cloud()
        ],

        [
            new BackgroundObject(`./img/5_background/layers/3_third_layer/1.png`, -719 * 2),
            new BackgroundObject(`./img/5_background/layers/2_second_layer/1.png`, -719 * 2),
            new BackgroundObject(`./img/5_background/layers/1_first_layer/1.png`, -719 * 2),
            new BackgroundObject(`./img/5_background/layers/3_third_layer/2.png`, -719),
            new BackgroundObject(`./img/5_background/layers/2_second_layer/2.png`, -719),
            new BackgroundObject(`./img/5_background/layers/1_first_layer/2.png`, -719),

            new BackgroundObject(`./img/5_background/layers/3_third_layer/1.png`, 0),
            new BackgroundObject(`./img/5_background/layers/2_second_layer/1.png`, 0),
            new BackgroundObject(`./img/5_background/layers/1_first_layer/1.png`, 0),
            new BackgroundObject(`./img/5_background/layers/3_third_layer/2.png`, 719),
            new BackgroundObject(`./img/5_background/layers/2_second_layer/2.png`, 719),
            new BackgroundObject(`./img/5_background/layers/1_first_layer/2.png`, 719),

            new BackgroundObject(`./img/5_background/layers/3_third_layer/1.png`, 719 * 2),
            new BackgroundObject(`./img/5_background/layers/2_second_layer/1.png`, 719 * 2),
            new BackgroundObject(`./img/5_background/layers/1_first_layer/1.png`, 719 * 2),
            new BackgroundObject(`./img/5_background/layers/3_third_layer/2.png`, 719 * 3),
            new BackgroundObject(`./img/5_background/layers/2_second_layer/2.png`, 719 * 3),
            new BackgroundObject(`./img/5_background/layers/1_first_layer/2.png`, 719 * 3),

            new BackgroundObject(`./img/5_background/layers/3_third_layer/1.png`, 719 * 4),
            new BackgroundObject(`./img/5_background/layers/2_second_layer/1.png`, 719 * 4),
            new BackgroundObject(`./img/5_background/layers/1_first_layer/1.png`, 719 * 4),
            new BackgroundObject(`./img/5_background/layers/3_third_layer/2.png`, 719 * 5),
            new BackgroundObject(`./img/5_background/layers/2_second_layer/2.png`, 719 * 5),
            new BackgroundObject(`./img/5_background/layers/1_first_layer/2.png`, 719 * 5),

            new BackgroundObject(`./img/5_background/layers/3_third_layer/1.png`, 719 * 6),
            new BackgroundObject(`./img/5_background/layers/2_second_layer/1.png`, 719 * 6),
            new BackgroundObject(`./img/5_background/layers/1_first_layer/1.png`, 719 * 6),
            new BackgroundObject(`./img/5_background/layers/3_third_layer/2.png`, 719 * 7),
            new BackgroundObject(`./img/5_background/layers/2_second_layer/2.png`, 719 * 7),
            new BackgroundObject(`./img/5_background/layers/1_first_layer/2.png`, 719 * 7)
        ],

        [
            new Air(-719 * 2),
            new Air(-719),

            new Air(0),
            new Air(719),

            new Air(719 * 2),
            new Air(719 * 3),

            new Air(719 * 4),
            new Air(719 * 5),

            new Air(719 * 6),
            new Air(719 * 7)
        ],

        [
            new Bottle(`./img/6_salsa_bottle/1_salsa_bottle_on_ground.png`, 370),
            new Bottle(`./img/6_salsa_bottle/2_salsa_bottle_on_ground.png`, 370),
            new Bottle(`./img/6_salsa_bottle/salsa_bottle.png`, 200),

            new Bottle(`./img/6_salsa_bottle/1_salsa_bottle_on_ground.png`, 370),
            new Bottle(`./img/6_salsa_bottle/2_salsa_bottle_on_ground.png`, 370),
            new Bottle(`./img/6_salsa_bottle/salsa_bottle.png`, 200),

            new Bottle(`./img/6_salsa_bottle/1_salsa_bottle_on_ground.png`, 370),
            new Bottle(`./img/6_salsa_bottle/2_salsa_bottle_on_ground.png`, 370),
            new Bottle(`./img/6_salsa_bottle/salsa_bottle.png`, 200),

            new Bottle(`./img/6_salsa_bottle/1_salsa_bottle_on_ground.png`, 370),
            new Bottle(`./img/6_salsa_bottle/2_salsa_bottle_on_ground.png`, 370),
            new Bottle(`./img/6_salsa_bottle/salsa_bottle.png`, 200),

            new Bottle(`./img/6_salsa_bottle/1_salsa_bottle_on_ground.png`, 370),
            new Bottle(`./img/6_salsa_bottle/2_salsa_bottle_on_ground.png`, 370),
            new Bottle(`./img/6_salsa_bottle/salsa_bottle.png`, 200)
        ],

        [
            new Coin(`./img/8_coin/coin_1.png`, 370),
            new Coin(`./img/8_coin/coin_1.png`, 200),

            new Coin(`./img/8_coin/coin_1.png`, 370),
            new Coin(`./img/8_coin/coin_1.png`, 200),

            new Coin(`./img/8_coin/coin_1.png`, 370),
            new Coin(`./img/8_coin/coin_1.png`, 200),

            new Coin(`./img/8_coin/coin_1.png`, 370),
            new Coin(`./img/8_coin/coin_1.png`, 200),

            new Coin(`./img/8_coin/coin_1.png`, 370),
            new Coin(`./img/8_coin/coin_1.png`, 200),

            new Coin(`./img/8_coin/coin_1.png`, 370),
            new Coin(`./img/8_coin/coin_1.png`, 200),

            new Coin(`./img/8_coin/coin_1.png`, 370),
            new Coin(`./img/8_coin/coin_1.png`, 200)
        ]
    );
}