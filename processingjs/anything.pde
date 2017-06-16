fill(0, 0, 0);
textSize(20);
textAlign(CENTER);

//images of Leafers
var seed= getImage("avatars/leafers-seed");
var seedling= getImage("avatars/leafers-seedling");
var sapling= getImage("avatars/leafers-sapling");
var tree= getImage("avatars/leafers-tree");
var ultimate = getImage("avatars/leafers-ultimate");

var currentScene;

var drawScene1 =function(){
    currentScene = 1;
    background(200, 175, 175);
    image(seed, 50,200);
    text("Leafers started out as a seed",200,50);
};

var drawScene5 =function(){
    currentScene = 5;
    background(150, 150, 175);
    image(ultimate, 200,200);
    text("In the end, Leafers became Ultimate Leafers",200,50);
};

drawScene1();

mouseClicked=function(){
    if(currentScene===1){
        drawScene5();
    }
    else if(currentScene===5){
        drawScene1();
    }
    
};

void setup()
{
  size(200,200);
  background(125);
  fill(255);
  noLoop();
  PFont fontA = loadFont("courier");
  textFont(fontA, 14);  
}

void draw(){  
  text("Hello Web!",20,20);
  println("Hello ErrorLog!");
}