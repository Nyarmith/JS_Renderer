// VECTOR DEFINITION
/**
 * algo_handler root namespace.
 *
 * @nameSpace algo_handler
 */
if (typeof vec2 == "undefined" || !vec2) {
    function vec2(){};
}

vec2.create = function() {
    var out = Array(2);
    out[0]=out[1]=0;
    return out;
}

vec2.dot = function(a, b) {
    return (a[0]*b[0]+a[1]*b[1]);
}

vec2.scale = function(a,s){
    var out = Array(2);
    out[0] = a[0] * s;
    out[1] = a[1] * s;
    return out;
}

vec2.multiply = function(a,b){
    var out = Array(2);
    out[0] *= a[0] * b[0];
    out[1] *= a[1] * b[1];
    return out;
}

vec2.add = function(a,b){
    var out = Array(3);
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
}

vec2.subtract = function(a,b){
    var out = Array(2);
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
}

vec2.size = function(a){
    return (Math.sqrt(a[0]*a[0]+a[1]*a[1]));
}

vec2.normalize = function(a){
    var out = Array(2);
    var size = vec2.size(a);
    out[0] = a[0] / size;
    out[1] = a[1] / size;
    return out;
}
// RENDERER DEFINITION
/**
 * Renderer root namespace
 *
 * @namespace Renderer
 */

if (typeof Renderer == "undefined" || !Renderer) {
    function Renderer(context, w, h){
    this.width = w;
    this.height = h;
    this.ctx = context;
    }
}

Renderer.prototype.clear = function(){
    this.ctx.clearRect(0, 0, this.width, this.height);
};

Renderer.prototype.drawShape = function(coordinates, strokestyle){
    if (typeof strokestype == "undefined"){
        strokestyle = "red";
    }

    this.ctx.strokeStyle = strokestyle;

    this.ctx.beginPath();
    this.ctx.moveTo(coordinates[0][0],coordinates[0][1]);

    for (var i = 1; i < coordinates.length; i++)
    {
        this.ctx.lineTo(coordinates[i][0],coordinates[i][1]);
    }

    this.ctx.closePath();
    this.ctx.stroke();
};

Renderer.prototype.fillShape = function(coordinates, strokestyle, fillstyle){
    if (typeof strokestype == "undefined"){
        strokestyle = "red";
    }

    this.ctx.strokeStyle = strokestyle;
    this.ctx.fillStyle = fillstyle;

    this.ctx.beginPath();
    this.ctx.moveTo(coordinates[0][0],coordinates[0][1]);

    for (var i = 1; i < coordinates.length; i++)
    {
        this.ctx.lineTo(coordinates[i][0],coordinates[i][1]);
    }

    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fill();
};

function Ship(size, pos, angle, tr, tf, pos_lim){
    this.radius = size/2;
    this.pos = pos;
    this.angle = angle;

    this.velocity = [0,0];

    this.maxVelocity = 2;
    this.shipAngle = Math.PI/4; //angle from center of ship to its side fins
    this.turnRate = tr;
    this.thrustForce = tf; //how much we can accelerate
    this.pos_limit = pos_lim;
}

Ship.prototype.thrust = function()
{
    var t = vec2.create();
    //angle is defined as angle from x axis, using canvas coordinates
    //increasing angle means turning right, decreasing means turning left
    t[0] = Math.cos(this.angle);
    t[1] = Math.sin(this.angle);

    this.velocity = vec2.add(this.velocity,vec2.scale(t,this.thrustForce));

    //impose some limits here or whatever
};

Ship.prototype.turn = function(angle)
{
    this.angle += angle;
};

Ship.prototype.turnLeft = function()
{
    this.turn(-this.turnRate);
};

Ship.prototype.turnRight = function()
{
    this.turn(this.turnRate);
};

//logic stuff that's checked every frame
Ship.prototype.update = function(dt)
{
    this.pos = vec2.add(this.pos,vec2.scale(this.velocity,dt));

    if (this.pos[0] > this.pos_limit[0]) {
        this.pos[0] = 0;
    } else if (this.pos[0] < 0){
        this.pos[0] = this.pos_limit[0];
    }

    if (this.pos[1] > this.pos_limit[1]){
        this.pos[1] = 0;
    } else if (this.pos[1] < 0) {
        this.pos[1] = this.pos_limit[1];
    }
};

Ship.prototype.getMesh = function()   //return set of 2d coords to draw
{
    //front of ship
    var myMesh = Array(3);

    //Tip
    var tip = vec2.create();
    tip[0] = this.pos[0] + Math.cos(this.angle)*this.radius;
    tip[1] = this.pos[1] + Math.sin(this.angle)*this.radius;
    myMesh[0] = tip;


    //bottom right
    //incorporate orientation plz
    var bottom_right = vec2.create();
    bottom_right[0] = this.pos[0] + Math.cos(this.angle + Math.PI - this.shipAngle)*this.radius;
    bottom_right[1] = this.pos[1] + Math.sin(this.angle + Math.PI - this.shipAngle)*this.radius;
    myMesh[1] = bottom_right;

    //bottom left
    var bottom_left = vec2.create();
    bottom_left[0] = this.pos[0] + Math.cos(this.angle + Math.PI + this.shipAngle)*this.radius;
    bottom_left[1] = this.pos[1] + Math.sin(this.angle + Math.PI + this.shipAngle)*this.radius;
    myMesh[2] = bottom_left;

    return myMesh;
};
var canvas = document.getElementById("myCanvas");

myRenderer = new Renderer(canvas.getContext("2d"), canvas.width, canvas.height);

//use request animation frame to save time when tabbed away from scene
var requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(c) {window.setTimeout(c,15);};

myShip = new Ship(10, [canvas.width/2, canvas.height/2], 0, 10*Math.PI/180, 0.025, [canvas.width, canvas.height]);

//polling inputs done with document event listener
document.addEventListener('keydown',
        function(e){
            switch(e.keyCode){
                case 83:    //"S"
                    myShip.shoot();
                    break;
                case 38:    //UP
                    myShip.thrust();
                    break;
                case 37:    //LEFT
                    myShip.turnLeft();
                    break;
                case 39:    //RIGHT
                    myShip.turnRight();
                    break;
            }
        },false);

date = new Date().getTime();

function Animate(){
    //do logic
    OldDate = date;
    date = new Date().getTime();
    myShip.update(date-OldDate);

    myRenderer.clear();
    myRenderer.fillRender(myShip.getMesh(), "blue", "blue");

    //requestAnimFrame with this method
    requestAnimFrame(Animate);
}

//start game
Animate();
