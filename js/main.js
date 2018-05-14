//var start;
var isPlaying = false;

var bpm = 128;
var step_Type = 4;
//var bar_type = 4;
 
var bar = 60 / bpm * 1000;
var stepsResolution = 16;

var step = bar / stepsResolution;

/*
$.getScript("sequencer.js", function() {
    alert("Script sequencer loaded but not necessarily executed.");
 });
*/

///////////////////////////////////////////////
var currentStep = 0;
var update_timeout;



var all_tracks = [];

//var track_xx = [];
var track_xx_channels = [];

var kick;
var channel_xx;
var snare;
var channel_xy;
var hhclosed;
var channel_xz;


///////////////////////////////////////////////


function preload() {

/*
    kick = document.createElement("audio");
    kick.scr = "../UI/sounds/kick.wave";
 */

    kick = loadSound("./akai/drumhits/KICKS/HH_JKick1.wav");
    snare = loadSound("./akai/drumhits/SNARES/HH_JRim1.wav");
    hhclosed = loadSound("./akai/drumhits/HATS/HH_Hat1.wav");
    
    var track_xx = new Track("Drum Rack" + "_" + all_tracks.length);

    all_tracks.push(track_xx);
    

    channel_xx = new drumRack_channel (kick);
    channel_xy = new drumRack_channel (snare);
    channel_xz = new drumRack_channel (hhclosed);

    all_tracks[0].channels[0] = channel_xx;
    all_tracks[0].channels[1] = channel_xy;
    all_tracks[0].channels[2] = channel_xz;

    clip_xx = new DrumRack_Clip(1, [[1],[],[],[],[2],[],[],[],[],[],[1],[],[2],[],[],[]]);
    clip_xy = new DrumRack_Clip(1);
    clip_xz = new DrumRack_Clip(2, [[1],[],[],[],[2],[],[],[],[2],[],[1],[],[2],[],[],[],[1],[],[],[],[2],[],[],[],[],[2],[1],[],[2],[],[],[]]);

    all_tracks[0].clips.push(clip_xx);
    all_tracks[0].clips.push(clip_xy);
    all_tracks[0].clips.push(clip_xz);
    

//    track_xx.push(track_xx_channels);

    // channel_xz = new drumRack_channel (hhclosed, [[0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0]],
    //     [0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0]);
}

function setup() {

// REMPLACER PAR UN MAP //
    for (var track of all_tracks) {

        loadTrack(track);
        
        console.log("track, " + track + " nbr of channels : " + track.channels.length);
        for (var channel of track.channels) {

            console.log(channel);            
            loadDrumRack_channel(channel);
        }

        console.log("track, " + track + " nbr of clips : " + track.clips.length);
        for (var clip of track.clips) {
            
            console.log(clip);
            loadDrumRack_clip(track, clip);
        }
    }

    kick.setVolume(1.0);
    kick.playMode("restart");
    snare.setVolume(1.0);
    snare.playMode("restart");
    hhclosed.setVolume(1.0);
    hhclosed.playMode("restart");

//////////////////////////////////////////
    

//////////////////////////////////////////

//    update();
}

function update() {
//////////////////////////////////////////////

//  A netoyer ?? // ( simplifier le code d'incrémentation )
    bar = 60 / bpm * 1000 * 4;
    step = bar / stepsResolution;
         


//  setTimeout("update()", step);
    update_timeout = setTimeout(() => {
        update(step);
    }, step);

/////////////////////////////////////////////

    launchSteps(currentStep);

/////////////////////////////////////////////
    currentStep += 1;
    if (currentStep >= stepsResolution) {
       currentStep = 0;
    }



//    console.log("bar : " + bar);
//     console.log("step : " + step);
//     kick.play();
}

function sessionPlay () {

    isPlaying = true;
    update();    
//    start = Date.now();
}

function sessionStop () {

    isPlaying = false;
    currentStep = 0;
    clearTimeout(update_timeout);    
//    start = null;
}

function sessionPause () {

    isPlaying = false;
    clearTimeout(update_timeout);    
//    start = null;
}

function setBPMx (tValue) {
    bpm = tValue;
    console.log("Tempo changed to : " + bpm);
}


function launchSteps (step) {


    for (var i = 0; i < all_tracks.length; i++) {
        var track = all_tracks[i];

        for (var j = 0; j < track.channels.length; j++) {

            var clip = track.clips[track.currentClip];
            var step = clip.steps[currentStep];
            var channel = track.channels[j - 1];

            for (var k = 0; k < step.length; k++) {

                if (step[k] == j) {

                    channel.sample.play();
                }
            }
        }
    }

}
/*
function nextSteps () {

    for (var chan of track_xx_channels) {
            console.log(chan
            
            );
            chan
            
            += 1;
    }
}
*/


function loadTrack (track) {
//pour le "create new track"
    // var track = new Track(type);
    
    var tracksContainer = document.getElementById("tracks-container");
    var ttemplate = new track_Template(track);
    tracksContainer.innerHTML += ttemplate.html;
}

class Track {

    constructor (type)  {

        this.type = type;
        this.name = type;

        this.channels = new Array(16);

        this.currentClip = 0;
        this.clips = [];
    }
}

function track_Template (track) {

    this.html = "<div id='" + track.name + "' type=\"button\" class=\"channel border rounded\">" + 
                    "<div>" + 
                    track.name + 
                    "</div>" + 
                    "<div class=\"progress\"><div class=\"progress-bar progress-bar-striped bg-info\" role=\"progressbar\" style=\"width: 65%\" aria-valuenow=\"65\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div></div>" + 
                "</div>";
}


function loadDrumRack_channel (channel) {
    
    if (channel != null) {

        var drumRackContainer = document.getElementById("steps-container");
        console.log("loaddrumRack_channel : " + channel.sample);
        var drtemplate = new drumRackChannel_Template(channel.sample);
        drumRackContainer.innerHTML += drtemplate.html;
    }
}

class drumRack_channel {

// Un systeme d'id pour éviter les problemes de réorganisation 
// des array lors de la suppression d'un channel 
    constructor (sample) {
        
//        this.steps = new Array(stepsResolution);
        this.sample = sample;
    }
}

function drumRackChannel_Template (sample) {

    this.html = "<div id='" + sample.name + "' class='row border'>" +
                    "<div class='col-sm-1 border'>" +
                    "    " + sample.name + " : " +
                    "</div>" +
                    "<div id='" + sample.name + "_currentClip" + "' class='col border'>" +
                    // A instancier depuis le chargement des clips 
                    //     "<input type='checkbox'><input type='checkbox'><input type='checkbox'><input type='checkbox'>" +
                    //     "<input type='checkbox'><input type='checkbox'><input type='checkbox'><input type='checkbox'>" +
                    //     "<input type='checkbox'><input type='checkbox'><input type='checkbox'><input type='checkbox'>" +
                    //     "<input type='checkbox'><input type='checkbox'><input type='checkbox'><input type='checkbox'>" +
                    // "</div>" +
                "</div>";
}

function loadDrumRack_clip (track, clip) {

    var clipsContainer = document.getElementById(track.name);
    var cliptemplate = new drumRackClip_Template(clip);
    clipsContainer.innerHTML += cliptemplate.html;

    // var stepsContainer = document.getElementById("steps-container");
    // var stepstemplate = new drumRackSteps_Template(clip);
    // stepsContainer.innerHTML += stepstemplate.html;

}

class DrumRack_Clip {

    constructor (barsLength, steps) {
        
        this.channels = new Array(16);
        if (!steps) {
            this.steps = new Array(stepsResolution * barsLength);
        } else {
            this.steps = steps;
        }
    }
}

function drumRackClip_Template (clip) {
    
    this.html = "<div>" +
                    "<div class='btn-group' role='group' aria-label='Basic example'>" +
                        "<button type='button' class='btn'>Clip ##</button>" +
                        "<button type='button' class='btn launch-btn'>Launch</button>" +
                    "</div>" +
                "</div>";
}

function drumRackSteps_Template (clip) {
    
    this.html = "CLIP<br>";
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