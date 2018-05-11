//var start;
var isPlaying = false;

var bpm = 128;
var step_Type = 4;
//var bar_type = 4;
 
var bar = 60 / bpm * 1000;
var stepsResolution = 16;

var stepCounter = 0;

var step = bar / stepsResolution;

/*
$.getScript("sequencer.js", function() {
    alert("Script sequencer loaded but not necessarily executed.");
 });
*/
/* a envoyer plus tard vers le script "sequencer" sur un channel */

/*
var subsFolder = Folder("../akai/drumhits/SUBS/");
var kicksFolder = Folder("../akai/drumhits/KICKS/");
var snaresFolder = Folder("../akai/drumhits/SNARES/");
var hatsFolder = Folder("../akai/drumhits/HATS/");
var cymbalsFolder = Folder("../akai/drumhits/CYMBALS/");
var tomsFolder = Folder("../akai/drumhits/TOMS/");
var percussionFolder = Folder("../akai/drumhits/PERCUSSION/");
var fxFolder = Folder("../akai/drumhits/FX/");
*/

///////////////////////////////////////////////

var drumRackChannelsList = [];

var kick;
var channel_xx;
var snare;
var channel_xy;


///////////////////////////////////////////////



function preload() {

    kick = loadSound("./akai/drumhits/KICKS/HH_JKick1.wav");
    snare = loadSound("./akai/drumhits/SNARES/HH_JRim1.wav");
    
    channel_xx = new drumRack_channel (kick,     [1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0] );
    channel_xy = new drumRack_channel (snare,    [0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0] );

    drumRackChannelsList.push(channel_xx);
    drumRackChannelsList.push(channel_xy);
}

function setup() {

/*
    kick = document.createElement("audio");
    kick.scr = "../UI/sounds/kick.wave";
 */


    kick.setVolume(1.0);
    kick.playMode("restart");
    snare.setVolume(1.0);
    snare.playMode("restart");

    console.log("preload channel_xx" + channel_xx);

//////////////////////////////////////////
    

//////////////////////////////////////////

    update();

    console.log("Project started with tempo of : " + bpm);
}

function update() {
//////////////////////////////////////////////

//  A netoyer ?? // ( simplifier le code d'incrémentation )
    bar = 60 / bpm * 1000 * 4;
    step = bar / stepsResolution;
         


//  setTimeout("update()", step);
    setTimeout(() => {
        update(step);
    }, step);

/////////////////////////////////////////////

    launchSteps(stepCounter);

/////////////////////////////////////////////
    stepCounter += 1;
    if (stepCounter >= stepsResolution) {
       stepCounter = 0;
    }



//    console.log("bar : " + bar);
//     console.log("step : " + step);
//     kick.play();
}

function sessionPlay () {

    isPlaying = true;
//    start = Date.now();
}

function sessionStop () {

    isPlaying = false;
//    start = null;
}

function setBPMx (tValue) {
    bpm = tValue;
    console.log("Tempo changed to : " + bpm);
}



function launchSteps (i) {
    if (isPlaying == true) {


        for (var chan of drumRackChannelsList) {

            if (chan.steps[i] != 0) {

                chan.sample.play();
            }
        }

    }
}







function newDrumRack (rack, sample, steps) {

    rack = new drumRack_channel(sample, steps);
}

class drumRack_channel {

    constructor (sample, steps) {
        
//        this.steps = new Array(stepsResolution);
        this.sample = sample;
        this.steps = steps;
    }
}









/*
class Clock {

    constructor (id) {

        this.id = id;
        this.timeElapsed;
    }
}

function clocktimeElapsed () {

    var now = Date.now();
    var timeSinceStart = (now - start) / 1000;

    return timeSinceStart;
}
*/










/* Pour plus tard, un système d'upload de samples */
/* ( Pour l'instant nous utiliserons exclusivement
une banque de samples prédéfinis par soucis de simplicité ) */
/*function loadSound(sample, channel) {

    var reader = new FileReader();
    reader.onload = function (e) {
      $('#sound_file')
        .attr('src', e.target.result);
        sound = e.target.result;
    };
    reader.readAsDataURL(sample.files[0]);
} */