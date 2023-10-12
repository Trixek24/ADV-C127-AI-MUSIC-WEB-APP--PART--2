song1 = "";
song2 = "";
right_wrist_x = 0;
right_wrist_y = 0;
left_wrist_x = 0;
left_wrist_y = 0;

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
}

function modelLoaded()
{
    console.log("Model Loaded");

}

function gotposes(results)
{
    if(results.length > 0)
    {
        right_wrist_x = results[0].pose.rightWrist.x;
        right_wrist_y = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+right_wrist_x + "rightWristY = "+ right_wrist_y);
        left_wrist_x = results[0].pose.leftWrist.x;
        left_wrist_y =  results[0].pose.leftWrist.y;
        console.log("leftWrist X = "+left_wrist_x+" leftWrist Y = "+left_wrist_y);
    }
}