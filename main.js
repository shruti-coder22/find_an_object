var img = "";
var status1 = "";
var objects = [];

function preload() {
    img = loadImage("Pets.jpg");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status = Detecting Objects";
}

function draw() {
    image(img, 0, 0, 640, 420);

    if (status1 != "") {
        for (var i=0; i<objects.length; i++) {
            strokeWeight(2);
            fill("#1AA7EC");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x +10, objects[i].y +10);
            noFill();
            stroke("#1AA7EC");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    document.getElementById("status").innerHTML = "Status - Object Detected";
    }
}

function modelLoaded() {
    console.log("Model Loaded");
    status1 = "true";
    objectDetector.detect(img, gotResult);
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}