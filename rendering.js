//Top level, code to run when window loaded
window.addEventListener('load', onLoadHandler, false);

function onLoadHandler()
{
    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    //creates and initializes new Asteroidz object
    myAsteroidz = new Asteroidz(ctx, width, height);

    myAsteroidz.runLoop();
}

function Ship(size, pos, angle){
    //hitbox is not a circle, this is just distance from each corner, which is on a circle of radius(pixels);, 6 is probably a good number for size, 3 radius
    this.radius = size/2; 
    this.pos = pos;
    this.angle = angle;
    this.velocity = [0,0];
    this.shipAngle = Math.PI/4;     //angle from center of ship to its side fins

    //Basically class globals at this section
    this.turnRate;  //how much we turn with every frame
    this.thrustForce;    //how much we accelerate every frame
}

Ship.thrust = function()
{
    //increase velocity in the direction of angle
    var y_component = 0;
    var x_component = 0;

    y_component = Math.cos(angle)*this.thrustForce;
    x_component = Math.sin(angle)*this.thrustForce;

    this.velocity[0] += x_component;
    this.velocity[1] += y_component;

    var mag = Math.sqrt(this.velocity[0]*this.velocity[0]+this.velocity[1]*this.velocity[1]);
    if (mag > this.maxV)
    {
        this.velocity[0]*=this.maxV/mag;
        this.velocity[1]*=this.maxV/mag;
    }
}

Ship.rotate = function(amount)
{
    this.angle += amount;

    if (this.angle < 0)
    {
        this.angle += 2*Math.PI;
    }
    else if (this.angle > 2*Math.PI)
    {
        this.angle -= Math.PI;
    }
}

Ship.turnLeft = function()
{
    this.rotate(-1*this.turnRate);
}

Ship.turnRight = function()
{
    this.rotate( 1*this.turnRate);
}

Ship.shoot = function()
{
    this.
}

function Asteroidz(ctx, wid, hgt, shipSize, lives, asteroidDensity, asteroidSizeMean, asteroidSizeStdDev)
{
    //ship size, initial,position as 2d vector, orientation as angle theta in radians
    this.ship = new Ship(shipSize, [widt/2,hgt/2], 0);
    this.ctx    = ctx;
    this.width  = wid;
    this.height = hgt;
    
    //populate asteroids entity list
    numAsteroids = Math.ceil(asteroidDensity*wid*hgt);

    //evenly disperse asteroids outside central region where player lies

}

//must be added as keydown event listener
Asteroidz.pollInputs = function(e)
{
    //sets states for runLogic to update
    switch(e.keycode)
    {
        case 83:    //S for "shoot"
            this.ship.shoot();
        case 37:    //LEFT
            this.ship.turnLeft();
        case 39:    //RIGHT
            //turn right
            this.ship.turnRight();
        case 38:    //UP
            this.ship.thrust();
    }
}

Asteroidz.runLoop = function()
{
    //get inputs, get frame, update 
    this.getinputs();
    this.upDate
    newFrame = this.update();
    setFrame(newFrame);
}

//create, update entities and check for collisions
Asteroidz.runLogic = function()
{
}

//given all states, render them
Asteroidz.render = function()
{
    //---------------------------
    //-------- DRAW SHIP --------
    //---------------------------
    s_x = []; //x values
    s_y = []; //y values

    //tip of ship
    s_x[0] = this.ship.pos[0] + Math.sin(this.ship.angle)*this.ship.radius;
    s_y[0] = this.ship.pos[1] + Math.cos(this.ship.angle)*this.ship.radius;


    //bottom right of ship
    s_x[1] = this.ship.pos[0] + Math.sin(Math.PI-this.ship.shipAngle)*this.ship.radius;
    s_y[1] = this.ship.pos[1] + Math.cos(Math.PI-this.ship.shipAngle)*this.ship.radius;
    
    //bottom left of ship
    s_x[2] = this.ship.pos[0] + Math.sin(Math.PI+this.ship.shipAngle)*this.ship.radius;
    s_y[2] = this.ship.pos[1] + Math.cos(Math.PI+this.ship.shipAngle)*this.ship.radius;

    this.ctx.beginPath();

    this.ctx.moveTo(s_x[0],s_y[0]);
    for (var i=1; i < 3; i++)
    {
        this.ctx.lineTo(s_x[i],s_y[i]);
    }
    this.ctx.closePath();

    //---------------------------
    //-------- DRAW ASTEROIDS ---
    //---------------------------
    
    //---------------------------
    //-------- DRAW PROJECTILES -
    //---------------------------
    this.ctx.stroke();
}
