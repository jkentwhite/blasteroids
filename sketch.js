let ship;
let lasers = [];
let blasteroids = [];
let zoom = true;
let start = false;
let numBlasts = 10;


function setup() {
  createCanvas(displayWidth, displayHeight);
  ship = new Ship();
  for(var i = 0; i < numBlasts; i++){
    blasteroids.push(new Blasteroid());
  }
  
  textAlign(CENTER);
  
}

function draw() {
  background(0);
  border();

  blasteroids.forEach(blasteroid => {
    blasteroid.render();  
    blasteroid.update();
    blasteroid.edges();
  });

  

  for(let i = lasers.length-1; i >= 0; i--){
    lasers[i].render();
    lasers[i].update();
    if((lasers[i].pos.x > width || lasers[i].pos.x < 0) || (lasers[i].pos.y > height || lasers[i].pos.y < 0)){
      lasers.splice(i,1);
    } else {

    for(let j = blasteroids.length-1; j >= 0; j--){
      if(lasers[i].hits(blasteroids[j])){
        if(blasteroids[j].r > 30){
          let newBlasteroids = blasteroids[j].breakUp();
          blasteroids = blasteroids.concat(newBlasteroids);
        }
        blasteroids.splice(j, 1);
        lasers.splice(i, 1);
        break;
      }
    }
  }
}

  if(blasteroids.length <= 0){
    for(let i = 0; i < numBlasts; i++){
      //start = false;
      blasteroids.push(new Blasteroid());
    }
  }

  if(start){
    noCursor();
  ship.turn();
  ship.update();
  ship.render();
  ship.edges();
  } else {
    startText();
    cursor(HAND);
  }

  if(zoom){
    camera.zoom = 0.75;
  } else {
    camera.zoom = 0.4;
  }

}

function keyReleased(){
  ship.setRotation(0);
  ship.propelling(false);
}

function keyPressed(){
  if(key == "l" || key == "L") {
    lasers.push(new Laser(ship.pos, ship.heading));
  } 

  if(key === "a" || key === "A"){
    ship.setRotation(-0.1);
  } 
  
  if(key === "d" || key === "D"){
    ship.setRotation(0.1);
  } 

  if(key === "n" || key === "N"){
    zoom= !zoom;
  } 

  if(key === "w" || key === "W"){
    ship.propelling(true);
  } 
}

function mousePressed() {
  start = true;
}

function startText() {
  strokeWeight(1);
  stroke(255);
  noFill();
    textSize(200);
    textStyle(ITALIC);
    text("BLASTEROIDS", width/2, height/2);
    textSize(100);
    let play = "click to play";
    text(play, width/2, height/2+100);
    noFill();
    textSize(24);
    stroke(255);
    text("A - turn left D - turn right W - thrust forward L - fire lasers", width/2, height - 50);

}

function border () {
  push();
  noFill();
  stroke(255);
  rect(0,0,width,height);
  pop();
}

