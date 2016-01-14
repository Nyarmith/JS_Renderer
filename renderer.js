// RENDERER DEFINITION
/**
 * Renderer root namespace
 *
 * @namespace Renderer
 */

if (typeof Renderer == "undefined" || !Renderer) {
    function Renderer(context){
    this.ctx = context;}
}

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
}

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
}

