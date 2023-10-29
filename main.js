song_status = "";
song_status2 = "";

song1 = "";
song2 = "";
right_wrist_x = 0;
right_wrist_y = 0;
left_wrist_x = 0;
left_wrist_y = 0;

scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload()
{
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();
    canvas.position(730,200);

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotposes);
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    song_status = song1.isPlaying();
    if(scoreLeftWrist > 0.2)
    {
        song2.stop();
    circle(left_wrist_x,left_wrist_y,20);
    if (song_status == false) {
        
        song1.play();
        document.getElementById("song").innerHTML = "Song One Is Playing";
    }
    }

    song_status2 = song2.isPlaying();
    if(scoreRightWrist > 0.2)
    {
        song1.stop();
    circle(right_wrist_x,right_wrist_y,20);
    if (song_status2 == false) {
        
        song2.play();
        document.getElementById("song").innerHTML = "Song Two Is Playing";
    }
    }

}

function modelLoaded()
{
    console.log("Model Loaded");

}

function gotposes(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);

        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+right_wrist_x + "rightWristY = "+ right_wrist_y);
        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y =  results[0].pose.leftWrist.y;
        console.log("leftWrist X = "+left_wrist_x+" leftWrist Y = "+left_wrist_y);
    }

}