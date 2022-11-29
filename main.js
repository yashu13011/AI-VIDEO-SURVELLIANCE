video = "";
status = "";
objects = [];

function preload(){
    video = createVideo("video.mp4");
    video.hide();
}

function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function draw(){
image(video , 0 , 0 , 480 , 380);

if(status != ""){
objectDetector.detect(video, gotResult);

for(i = 0; i < objects.length; i++){
    document.getElementById("status").innerHTML = "Objects Detected";
    document.getElementById("no_of_objects").innerHTML = "No. of objects detected: " + objects.length;

    fill("#e82a2a");

    accuracy = floor(objects[i].confidence * 100);
    text(objects[i].label + accuracy + "" +  "%" , objects[i].x + 15 , objects[i].y + 15);
    noFill();
    stroke("#e82a2a");

    rect(objects[i].x , objects[i].y, objects[i].width, objects[i].height);
}
}

}

function modelLoaded(){
    console.log("Model is Loaded!!");
    video.loop();
    video.volume(0);
    video.speed(1);
    status = true;
}

function gotResult(error, results){
if(error){
    console.error(error);
}
console.log(results);
objects = results;
}