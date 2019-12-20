
// Taken from generative gastaltung book
// click                  : start a new cirlce
// position x/y           : direction & speed
// 1 - 2                  : fill styles
// 3 - 4                  : form style line/circle
// arrow up/down          : step size +/-
// delete/backspace       : cleardisplay
// s                      : save

"use strict"

var formResolution = 15; 
var stepSize = 2; 
var distortionFactor = 1; 
var initRadius = 150; 
var centerX; 
var centerY; 
var x =[];
var y = [] ; 
var freeze = false; 



function setup() {
    createCanvas(windowWidth, windowHeight);
    
    //init shape

    centerX = width / 2 ; 
    centerY = height /2 ;

    var angle = radians(360 / formResolution);
    for (var i = 0 ; i < formResolution ; i ++ ) {
        x.push(cos(angle * i ) * initRadius);
        y.push(sin(angle * i ) * initRadius);
    }

    stroke(252,246,245);
    strokeWeight(0.75);
    background(137, 171, 227);
}

function draw(){
    //Keep near mouse position
    centerX += (mouseX - centerX) * 0.01;
    centerY += (mouseY - centerY) * 0.01;

    //Calculate new points

    for (var i = 0 ; i < formResolution; i++){
        x[i] += random(-stepSize, stepSize);
        y[i] += random(-stepSize, stepSize);
    }


    noFill();

    beginShape();
    //Start Control point
    curveVertex(x[formResolution - 1] + centerX, y[formResolution - 1] + centerY)

    // Only these points are drawn

    for (var i = 0; i < formResolution; i++){
        curveVertex(x[i] + centerX, y[i] + centerY);
    }
    curveVertex(x[0] + centerX, y[0] + centerY);
    //end control point
    curveVertex(x[1] + centerX, y[1] + centerY);
    endShape();

}

function mousePressed(){
    //init shape on mouse position

    centerX = mouseX; 
    centerY = mouseY; 


    var angle = radians(360 / formResolution);
    var radius = initRadius * random(0.5 , 1);
    for (var i = 0 ; i < formResolution ; i++){
        x[i] = cos(angle * i) * radius ; 
        y[i] = sin(angle *i ) * radius ; 
    }

}

function keyReleased(){
    if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');
    if (keyCode == DELETE) background(137, 171, 227); 

    if (keyCode == UP_ARROW) stepSize++ ; 
    if (keyCode == DOWN_ARROW) stepSize--;
    stepSize = max(stepSize, 1); 

    // pause play draw loop
    if (key =='f' || key == 'F') freeze =!freeze;
    if(freeze){
        noLoop();
    } else{
        loop();
    }

}


