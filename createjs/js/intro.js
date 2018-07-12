var stage;

function init() {
    var text;
    var dimensions;
    stage = new createjs.Stage("canvas");
    text = new createjs.Text("Text rendered on the canvas ", "30px Arial", "#666");
    text.textBaseline = "alphabetic";
    dimensions = text.getBounds();
    text.x = stage.canvas.width/2 - dimensions.width/2;
    text.y = stage.canvas.height/2 - dimensions.height/2;
    text.addEventListener("click", onBallClicked);
    stage.addChild(text);
    stage.update();
}
function onBallClicked(event) {
    console.log("你好");
}