var start;
var isPlaying = false;

var bpm = 128;
var step_Type = 4;
var bar_type = 4;
 
var interval;



var tickSound;
var tackSound;

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

function preload() {

    tickSound = document.createElement("audio");
    tickSound.scr = "../UI/sounds/tick.wave";

    tackSound = loadSound("../UI/sounds/tick.wave");

    console.log("Ticksound : " + tickSound);
    console.log("Ticksound / path : " + tickSound.scr);

    console.log("Tacksound : " + tackSound);
    console.log("Tacksound / path : " + tackSound.scr);
}

function setup() {

//    clock.isPlaying = true;
    tackSound.setVolume(0.7);
    tackSound.playMode("restart");
}

/* Le moteur */
setInterval(update(),2000);

function update() {

    tackSound.play();

    masterClock.tick();
    console.log("time elapsed since begining : " + clock.timeElapsed() );
}

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

function sessionPlay () {

    isPlaying = true;
    start = Date.now();

}

function sessionStop () {

    isPlaying = false;
    start = null;
}

class Clock {

    constructor (id) {

        this.id = id;
//      this.isPlaying = flase;
        this.timeElapsed;
        this.tick;
    }

/*
    if (this.isPlaying == true){

    }
*/
}

function clocktimeElapsed () {

    var now = Date.now();
    var timeSinceStart = (now - start) / 1000;

    return timeSinceStart;
}

function  clocktick () {

    var bar = 60 / bpm / step_Type;

    if (this.timeElapsed % bar == 0) {

        tick.play();
    }
}