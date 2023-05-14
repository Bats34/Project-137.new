status="";
input_results="";
objects=[];
synth=window.speechSynthesis;
i="";
function setup() {
    canvas=createCanvas(280,280);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
}
function draw() {
    image(video,0,0,280,280);
    
    if(status!="") {
        
        objectdetecter.detect(video,gotResult);
        for(i=0;i<objects.length;i++) {
            percent=floor(objects[i].confidence*100);
            fill("#FF0000");
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        
    
    if(objects[i].label==input_results) {
        video.stop();
        objectdetecter.detect(gotResult);
        document.getElementById("status").innerHTML=input_results+" found!";
        document.getElementById("number_objects").innerHTML="Number of Objects : "+objects.length;
        utterthis=new SpeechSynthesisUtterance(input_results+"found");
        synth.speak(utterthis);
    }  
    }
    }
}

function start() {
    objectdetecter=ml5.objectDetector('cocossd',modelLoaded);
    input_results=document.getElementById("in").value;
    console.log(input_results);
}

    function modelLoaded() {
    console.log("Model has Loaded!!");
    status=true;

}
function gotResult(error,results){
    if(error){
        console.error(error)
    }else{
        console.log(results);
        objects=results;
    }
}