fill(0, 0, 0);
textSize(20);
textAlign(CENTER);

//images of Leafers
var seed= loadImage("avatars/leafers-seed.png");
var seedling= loadImage("avatars/leafers-seedling.png");
var sapling= loadImage("avatars/leafers-sapling.png");
var tree= loadImage("avatars/leafers-tree.png");
var ultimate = loadImage("avatars/leafers-ultimate.png");

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
  size(400,400);
  
}