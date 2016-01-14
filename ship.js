function Ship(size, pos, angle, tr, tf){
    this.radius = size/2;
    this.pos = pos;
    this.angle = angle;

    this.velocity = [0,0];

    this.maxVelocity = 2;
    this.shipAngle = Math.PI/4; //angle from center of ship to its side fins
    this.turnRate = tr;
    this.thrustForce = tf; //how much we can accelerate
}

Ship.prototype.thrust = function()
{
    var t = vec2.create();
    //angle is defined as angle from x axis, using canvas coordinates
    //increasing angle means turning right, decreasing means turning left
    t[0] = Math.cos(this.angle);
    t[1] = Math.sin(this.angle);

    this.velocity = vec2.add(this.velocity,t);

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

Ship.prototype.update = function(dt)
{
    this.pos = vec2.add(this.pos,vec2.scale(this.velocity,dt));
}

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
