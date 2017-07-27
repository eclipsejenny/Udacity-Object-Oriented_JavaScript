// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    //Setting the Enemy initial location (you need to implement)
    this.x = x;
    this.y = y;

    //Setting the Enemy speed (you need to implement)
    this.speed = Math.random();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //Updates the Enemy location (you need to implement)
    if(this.x < 505) {//if enemy's on the canvas, move to new location
        this.x = this.speed + this.x;
    } else {//if the enemy's not on the canvas, move it back to the starting location
        this.x = 0 * 101;
    }

    //Handles collision with the Player (you need to implement)
    //this is implemented in the Player's section
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    //Loading the image by setting this.sprite to the appropriate image in the image folder 
    //(use the code from the Enemy function as an example on how to do that)
    this.sprite = 'images/char-boy.png';

    //Setting the Player initial location
    this.x = 2 * 101;
    this.y = 4 * 83;
};

Player.prototype.update = function(dt) {
    //Updates the Player location (you need to implement)
    //Nothing here for now

    //Handles collision with the Enemy (you need to implement)
    for(var i = 0; i < allEnemies.length; i++) {//for each enemy
        if(this.y == allEnemies[i].y) {//firstly check the y position
            if(this.x < allEnemies[i].x + 50 && this.x > allEnemies[i].x - 60) {//if x position falls in the bug range
                console.log("You are hitting the bugs");
                this.x = 2 * 101;//player will get back to the starting position once hit the bugs
                this.y = 4 * 83;
            }
        }
    }
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//The handleInput method, which should receive user input, 
//allowedKeys (the key which was pressed) and move the player according to that input. In particular:
Player.prototype.handleInput = function(direction) {
    //Left key should move the player to the left, right key to the right, up should move the player up and down should move the player down.
    //Recall that the player cannot move off screen (so you will need to check for that and handle appropriately).
    //If the player reaches the water the game should be reset by moving the player back to the initial location (you can write a separate reset Player method to handle that).
    
    switch(direction) {
        case "left": 
            if(this.x > 0) {//if player's left side is on the canvas
                this.x = this.x - 101;
            }
            break;
        case "up":
            if(this.y > 83) {//if player hasn't reached water
                this.y = this.y - 83;
            } else {//if player has reached water, get back to the starting position
                this.x = 2 * 101;
                this.y = 4 * 83;               
                console.log("You won!");

                ctx.font = '48px Impact';
                ctx.textAlign = "center";
                ctx.strokeStyle = "black";
                ctx.fillStyle = "white";
                ctx.lineWidth = 3;
                ctx.fillText("You won!", 505 / 2, 606 / 2);
                ctx.strokeText("You won!", 505 / 2, 606 / 2);

                for(var i = 0; i < allEnemies.length; i++) {//for each enemy
                    allEnemies[i].speed += Math.random();//spped will have a random increase 
                }    
            }
            break;
        case "right":
            if(this.x < 505 - 101) {//if player's right side is on the canvas
                this.x = this.x + 101;
            }
            break;
        case "down":
            if(this.y < 5 * 83) {//if player's above the bottom line of grass
                this.y = this.y + 83;
            }
            break;
        default:
            this.x = 2 * 101;
            this.y = 4 * 83; 
    }   
};



// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player();
var enemy1 = new Enemy(-101, 1 * 83);//the top bug
var enemy2 = new Enemy(-101, 2 * 83);//the middle bug
var enemy3 = new Enemy(-101, 3 * 83);//the bottom bug
var allEnemies = [enemy1, enemy2, enemy3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
