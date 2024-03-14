video = "";
status = "";

object = [];

playing = "false";

function preload()
{
    console.log('nothing to write');
    alarm = loadSound('alamr.mp3');
}

function setup()
{
    canvas = createCanvas(380, 380);
    canvas.center();
    video =  createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
}

function draw()
{
    image(video, 0, 0, 380, 380);

    alarm.setVolume(.25);

    if (status != "")
    {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult);
        if (playing=="true")
        {
            alarm.play()
        }
        if (playing=="false")
        {
            alarm.stop()
        }
        for (i = 0; i<object.length; i++)
        {
            if (object[0].label=="person")
            {
                document.getElementById('status').innerHTML='Status : Homosapien Sapien Detected';

                fill(r,g,b);
                var percent = floor(object[i].confidence*100);
                text("homosapien sapien"+" "+percent+"%", object[i].x+15, object[i].y+15);
                noFill();
                stroke(r,g,b);
                rect(object[i].x, object[i].y, object[i].width, object[i].height);
                // alarm.stop()
                playing = "false";
            }
            else
            {
                document.getElementById('status').innerHTML='Status : Homosapien Sapien Not Detected';
                // alarm.play();
                playing = "true";
            }
        }
    }
}

function gotResult(error, results)
{
    if (error)
    {
        console.error(error);
    }
    else 
    {
        console.log(results);

        object = results;
    }
}

function modelLoaded()
{
    console.log('Model Loaded');
    status = true;
    objectDetector.detect(video, gotResult);
}