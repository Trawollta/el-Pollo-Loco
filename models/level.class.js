/**
 * Represents a game level, containing enemies, an endboss, clouds, background objects, coins, and bottles.
 */
class Level {

    enemies;
    endboss;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 7000;
    

    /**
     * Constructs a new Level object with specified game elements.
     * @param {MovableObject[]} enemies - Array of enemy objects in the level.
     * @param {Endboss} endboss - The endboss object for the level.
     * @param {Cloud[]} clouds - Array of cloud objects in the level.
     * @param {MovableObject[]} backgroundObjects - Array of background objects in the level.
     * @param {Coins[]} coins - Array of coin objects in the level.
     * @param {Bottles[]} bottles - Array of bottle objects in the level.
     */
    constructor (enemies, endboss,clouds, backgroundObjects, coins, bottles) {
        this.enemies= enemies;
        this.endboss= endboss;
        this.clouds= clouds;
        this.backgroundObjects= backgroundObjects;
        this.coins= coins;
        this.bottles= bottles;
    }
}
