var canvas = document.getElementById("myCanvas");

myRenderer = new Renderer(canvas.getContext("2d"));

//use request animation frame to save time when tabbed away from scene
var requestAnimFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.msRequestAnimationFrame || function(c) {window.setTimeout(c,15);};

myShip = Ship.create();

//polling inputs done with document event listener
document.addEventListener('keydown',
        function(e){
            switch(e.keycode){
                case 83:    //"S"
                    myShip.shoot();
                    break;
                case 38:    //UP
                    myShip.thrust();
                    break;
                case 39:    //LEFT
                    myShip.turnLeft();
                    break;
                case 37:    //RIGHT
                    myShip.turnRight();
                    break;
            }
        },false);

function Animate(){
    //do logic
    OldDate = date;
    date = new Date();
    myShip.update(dt);

    myRenderer.fillRender(myShip.getMesh());

    //requestAnimFrame with this method
    requestAnimFrame(Animate);
}
