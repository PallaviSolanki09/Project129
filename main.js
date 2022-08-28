song_1="";
song_2="";

leftWrist_x="";
rightWrist_x="";
leftWrist_y="";
rightWrist_y="";

score_leftWrist="";
score_rightWrist="";

function preload(){
    song_1=loadSound("Song_1.mp3");
    song_2=loadSound("Song_2.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    posenet=ml5.poseNet(video,modalloaded);
    posenet.on('pose',gotResult);
}

function modalloaded(){
    console.log("Modal is Loaded");
}

function draw(){
    image(video,0,0,600,500);

    stroke("red");
    fill("red");
    circle(rightWrist_x,rightWrist_y,20);
    song_1.stop();

    song_1_status=song_1.isPlaying();
    song_2_status=song_2.isPlaying();

    if(score_leftWrist>0.1){
        circle(leftWrist_x,leftWrist_y,20);
        song_1.stop();
        if(song_2_status==false){
            song_2.play();
            document.getElementById("song_name").innerHTML="Play Song : Har Har Shambhu";
        }
    }
    if(score_rightWrist>0.1){
        circle(rightWrist_x,rightWrist_y,20);
        song_2.stop();
        if(song_1_status==false){
            song_1.play();
            document.getElementById("song_name").innerHTML="Play Song : Mera Balam Thanedar";
        }
    }
}

function gotResult(results){
    if(results.length>0){
        console.log(results);
        score_leftWrist=results[0].pose.keypoints[9].score;
        score_rightWrist=results[0].pose.keypoints[10].score;
        leftWrist_x=results[0].pose.leftWrist.x;
        leftWrist_y=results[0].pose.leftWrist.y;
        rightWrist_x=results[0].pose.rightWrist.x;
        rightWrist_y=results[0].pose.rightWrist.y;
    }
}