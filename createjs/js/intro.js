var stage;
var text;
function init() {
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
    console.log("你好嗎?");
    text2();
}
function text2() {
    var text2 = new createjs.Text("Hello~ How are you? ", "30px Arial", "#666");
    text2.textBaseline = "alphabetic";
    dimensions = text2.getBounds();
    text2.x = text.x;
    text2.y = text.y+40;
    stage.addChild(text2);
    stage.update();
}