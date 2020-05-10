var database;
var drawing = [], currentPath=[], isDrawing = false;

function setup(){
    canvas = createCanvas(400,400);
    canvas.mousePressed(startPath);
    canvas.parent('canvascontainer');
    canvas.mouseReleased(endPath);
    database = firebase.database();
    var saveButton = select('#saveButton');
    saveButton.mousePressed(saveDrawing);
    var clearButton = select('#clearButton')
    clearButton.mousePressed(clearDrawing);
}

function startPath(){
    isDrawing = true;
    currentPath=[];
    drawing.push(currentPath)
}

function endPath(){
    isDrawing = false;
}

function draw(){
    background(0);

    if(isDrawing){
        var point = {
            x: mouseX,
            y: mouseY
        }
        currentPath.push(point);
    }

    stroke(255);
    strokeWeight(5);
    noFill();
    for (var i=0; i<drawing.length; i++){
        var path = drawing[i];
        beginShape();
        for (var j=0; j<path.length; j++){
            vertex (path[j].x,path[j].y);
        }
        endShape();
    }
}
function saveDrawing(){
    var ref = database.ref('drawings')
    ref.push(drawing); 
}
function clearDrawing(){
    drawing = [];

}