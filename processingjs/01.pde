void setup()
{
  size(400,400);
  
}

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

var drawScene2 =function(){
    currentScene = 2;
    background(147, 141, 204);
    image(seedling, 50,200);
    text("Leafers started out as a seedling",200,50);
};

var drawScene3 =function(){
    currentScene = 3;
    background(76, 212, 106);
    image(sapling, 50,200);
    text("Leafers started out as a sapling",200,50);
};

var drawScene4 =function(){
    currentScene = 4;
    background(176, 102, 42);
    image(tree, 50,200);
    text("Leafers started out as a tree",200,50);
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
        drawScene2();
    }
    else if(currentScene===2){
        drawScene3();
    }
    else if(currentScene===3){
        drawScene4();
    }
    else if(currentScene===4){
        drawScene5();
    }
    else if(currentScene===5){
        drawScene1();
    }
    
};

