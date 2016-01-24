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
    myRenderer.fillShape(myShip.getMesh(), "blue", "blue");

    //requestAnimFrame with this method
    requestAnimFrame(Animate);
}

//start game
Animate();
