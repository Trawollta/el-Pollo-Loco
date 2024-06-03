let level1;

function initLevel() {

level1 =new Level(

    [
        new Chicken(600),
        new Chicken(1000),
        new Chicken(1400),
        new Chicken(1800),
        new Chicken(2000),
        new Chicken(3000),
        new Chicken(3500),
        new Smallchicken(600),
        new Smallchicken(800),
        new Smallchicken(1000),
        new Smallchicken(1200),
        new Smallchicken(1600),
        new Smallchicken(1900),
        new Smallchicken(2400),
        new Smallchicken(3000),
        new Smallchicken(3500),
        

    ],
    [
        new Endboss()
    ],
    [
        new Cloud(0),
        new Cloud(500),
        new Cloud(1000),
        new Cloud(1500)
    ],
    [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719), 
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0),                                                                    
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),  
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0), 
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),   
    
        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
    
    
        new BackgroundObject('img/5_background/layers/air.png', 719*2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),
    
        new BackgroundObject('img/5_background/layers/air.png', 719*3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3), 
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3),
    
        new BackgroundObject('img/5_background/layers/air.png', 719*4),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*4), 
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*4),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*4),
    
        new BackgroundObject('img/5_background/layers/air.png', 719*5),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*5), 
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*5),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*5),
    
        new BackgroundObject('img/5_background/layers/air.png', 719*6),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*6), 
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*6),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*6),

        new BackgroundObject('img/5_background/layers/air.png', 719*7),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*7), 
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*7),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*7),
    ],
    [
        new Coins(500),
        new Coins(800),
        new Coins(1200),
        new Coins(2000),
        new Coins(2400),
        new Coins(2800),
        new Coins(2850),
        new Coins(3900),
        new Coins(3800)
    ],
    [
        new Bottles(300),
        new Bottles(600),
        new Bottles(800),
        new Bottles(900),
        new Bottles(1000),
        new Bottles(1500),
        new Bottles(2000),
        new Bottles(2400),
        new Bottles(3000),
        new Bottles(3500),
        new Bottles(4000)
    ]
);
}

