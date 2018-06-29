var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1, 
            speed: -3,
            gameItems: [
                {type: 'sawblade',x:400,y:groundY - 50},
                {type: 'sawblade',x:600,y:groundY - 50},
                {type: 'sawblade',x:900,y:groundY - 50},
                {type: 'box',x:900,y:250},
                {type: 'enemy',x:400,y:groundY-10},
                {type: 'enemy',x:800,y:groundY-10},
                {type: 'enemy',x:1200,y:groundY-10},
                {type: 'reward',x:600,y:280},
                {type: 'reward',x:1200,y:260},
                {type: 'reward',x:1800,y:260},
                {type: 'reward',x:2400,y:260}
            ]
            
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE
        // var hitZoneSize = 15;
        // var damageFromObstacle = 10;
        // var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
        // myObstacle.x = 400;
        // myObstacle.y = 200;
        // game.addGameItem(myObstacle);
        // var obstacleImage = draw.bitmap('img/vaultboy.jpg');
        // myObstacle.addChild(obstacleImage);
        // obstacleImage.x = -25;
        // obstacleImage.y = -25;
        // obstacleImage.scaleX = .09;
        // obstacleImage.scaleY = .09;
        
        function createSawBlade(x,y) {
            var hitZoneSize = 15;
            var damageFromObstacle = 10;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/vaultboy.jpg');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            obstacleImage.scaleX = .09;
            obstacleImage.scaleY = .09;
        }
       
        // createSawBlade(1200,290);
        // createSawBlade(1500,300);
        // createSawBlade(1650,220);
        
        function createBox(x,y) {
            var hitZoneSize = 20;
            var damageFromObstacle = 20;
            var myObstacle = game.createObstacle(hitZoneSize,damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/vaultbboy.gif');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
            obstacleImage.scaleX = .4;
            obstacleImage.scaleY = .4;
        }
        
        function createEnemy(x,y) {
        // all code from TODO 12
            var enemy =  game.createGameItem('enemy',25);
            var redSquare = draw.bitmap('img/plane.png');
            var hitZoneSize = 50;
            redSquare.x = -25;
            redSquare.y = -25;
            enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = groundY;
            enemy.scaleX = 0.4;
            enemy.scaleY = 0.4;
            game.addGameItem(enemy);
            enemy.velocityX = -1;
            enemy.rotationalVelocity = -5;
            
            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-10);
                enemy.fadeOut();
            };
            enemy.onProjectileCollision = function(){
                console.log('Halle has hit the enemy');
                game.increaseScore(100);
                enemy.fadeOut();
            };
    }
        
        function createReward(x,y) {
            var reward = game.createGameItem('reward',25);
            var cat = draw.bitmap('img/cat.png');
            var hitZoneSize = 25;
            cat.x = -325;
            cat.y = -325;
            reward.addChild(cat);
            reward.x = x;
            reward.y = y;
            reward.scaleX = 0.5;
            reward.scaleY = 0.5;
            game.addGameItem(reward);
            reward.velocityX = -1;
            
            reward.onPlayerCollision = function(){
                console.log('Halle has collected the reward');
                game.increaseScore(500);
                reward.fadeOut(); 
            //     cat.onProjectileCollision = function(){
            //     console.log('Halle has collected the reward');
            //     game.increaseScore(500);
            //     cat.fadeOut();
            // };
            }
        }
        
        // createEnemy(1200, groundY)
        //createEnemy(1200,groundY-10);
      
      //  createBox(900,250);s
        
        //createReward(900, groundY - 10);
        for(var i = 0; i < levelData.gameItems.length ; i++) {
            var posX=levelData.gameItems[i].x;
            var posY=levelData.gameItems[i].y;
            if (levelData.gameItems[i].type === 'sawblade'){
                createSawBlade(posX, posY);
            } else if(levelData.gameItems[i].type === 'box'){
                        createBox(posX, posY);
            } else if(levelData.gameItems[i].type === 'enemy'){
                       createEnemy(posX, posY);
            } else if(levelData.gameItems[i].type === 'reward'){
                       createReward(posX, posY);
            }
        }
    };
    
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}