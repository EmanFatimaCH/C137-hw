status="";
input_text="";
objects=[];

function setup(){
canvas = createCanvas(300,290);
canvas.position(480,250);
video = createCapture(VIDEO);
video.size(300,290);
video.hide();
}

function start(){
objectDetector = ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML = "status : detecting objects";
input_text = document.getElementById("input_id").value;
}

function modelLoaded(){
console.log("model_loaded")
status=true;
}

function draw(){
image(video,0,0,300,290);

if(status != ""){
    objectDetector.detect(video,gotResult);
    for(i = 0; i < objects.length; i++)
    document.getElementById("status").innerHTML = "Status : Object Detected";
    console.log(objects.length)
fill("#sf0000");
percent=floor(objects[i].confidence * 100);
text(objects[i].label + " " + percent + "%",objects[i].x + 15,objects[i].y + 15);
noFill()
stroke("#ff0000");
rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
if(objects[i].label == input_text){
video.stop();
object_detectore.detect(gotResult);
document.getElementById("object_found").innerHTML = input_text+"Found";
var synth = window.speechSynthesis;
var utterThis = new SpeachSynthesisUtterence(input_text+"found");
synth.speak(utterThis);
}

else{
document.getElementById("object_found").innerHTML = input_text+"Not_Found";
}

}

function gotResult(error,results){
if(error){
console.error(error);
}

else{
console.log(results);
objects = results;
}

}

}