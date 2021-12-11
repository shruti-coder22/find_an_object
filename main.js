var img = "";
var status1 = "";
var objects = [];
var find_this = "";
function preload() {
    img = loadImage("Pets.jpg");
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML="Status = Detecting Objects";
}

function draw() {
    image(video, 0, 0, 640, 420);
    find_this = document.getElementById("finder").value
    if (status1 != "") {
        for (var i=0; i<objects.length; i++) {
            strokeWeight(2);
            fill("#1AA7EC");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x +10, objects[i].y +10);
            noFill();
            stroke("#1AA7EC");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
            if (find_this==i) {
                document.getElementById("status").innerHTML = find_this + " is found";
            } else {
                document.getElementById("status").innerHTML = "Sorry, this object is not found";
            }
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
        document.getElementById("status").innerHTML = "Sorry, there was an a error";
    } else {
        console.log(results);
        objects = results;
    }
}