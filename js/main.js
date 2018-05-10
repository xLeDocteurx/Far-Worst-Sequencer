var start;
var isPlaying = false;

var bpm = 128;
var step_Type = 4;
var bar_type = 4;
 
var bar = 60 / bpm;

var interval = 1000;



var tick;

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
    tick = loadSound("UI/sounds/tick.wav");

//    createCanvas(100, 100);
}

function setup() {
/*
    tick = document.createElement("audio");
    tick.scr = "../UI/sounds/tick.wave";
 */   
    tick.setVolume(0.7);
    tick.playMode("restart");

}
setInterval("update()",bar * 1000);

function update() {

    console.log("bar : "+bar);
//    tick.play();

    masterClock.tick();
//    console.log("time elapsed since begining : " + clock.timeElapsed() );
}



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
        this.timeElapsed;
    }
}

function clocktimeElapsed () {

    var now = Date.now();
    var timeSinceStart = (now - start) / 1000;

    return timeSinceStart;
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