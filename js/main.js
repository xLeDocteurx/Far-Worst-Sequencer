var fr = 30;

//var start;
var isPlaying = false;

var bpm = 105;
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

var kick1;
var channel_xx;
var snare;
var channel_xy;
var hhclosed;
var channel_xz;
var clap;
var channel_xa;


///////////////////////////////////////////////


function preload() {

/*
    kick = document.createElement("audio");
    kick.scr = "../UI/sounds/kick.wave";
 */

    kick1 = loadSound("./factory_samples/mad_zack/Satin_Charly/kick1.wav");
    snare = loadSound("./factory_samples/mad_zack/Satin_Charly/snare.wav");
    hhclosed = loadSound("./factory_samples/mad_zack/Satin_Charly/hhc.wav");
    clap = loadSound("./factory_samples/mad_zack/Satin_Charly/clap.wav");
    
    var track_xx = new Track(all_tracks.length, "Drum Rack");

    all_tracks.push(track_xx);
    

    channel_xx = new drumRack_Steps (all_tracks[0].channels.length, kick1);
    all_tracks[0].channels.push(channel_xx);
    
    channel_xy = new drumRack_Steps (all_tracks[0].channels.length, snare);
    all_tracks[0].channels.push(channel_xy);

    channel_xz = new drumRack_Steps (all_tracks[0].channels.length, hhclosed);
    all_tracks[0].channels.push(channel_xz);

    channel_xa = new drumRack_Steps (all_tracks[0].channels.length, clap);
    all_tracks[0].channels.push(channel_xa);


    clip_xx = new DrumRack_Clip(all_tracks[0].clips.length, 1,
                                   [[1],[],[],[],
                                    [4],[],[],[],
                                    [1],[],[1],[],
                                    [4],[1],[],[]]);
                                    
    all_tracks[0].clips.push(clip_xx);

    clip_xy = new DrumRack_Clip(all_tracks[0].clips.length, 1, 
                                   [[1],[],[3],[],
                                    [2],[],[],[3],
                                    [1],[],[3],[],
                                    [2],[],[3],[3]]);
    
    all_tracks[0].clips.push(clip_xy);

    clip_xz = new DrumRack_Clip(all_tracks[0].clips.length, 1, 
                                   [[1],[],[3],[],
                                    [1],[],[3],[],
                                    [1],[],[3],[],
                                    [1],[],[3],[]]);
    
    all_tracks[0].clips.push(clip_xz);

    clip_xa = new DrumRack_Clip(all_tracks[0].clips.length, 1, 
                                   [[1],[3],[3],[3],
                                    [2,3],[3],[3],[3],
                                    [1],[3],[3],[3],
                                    [2,3,4],[3],[3],[3]]);
    
    all_tracks[0].clips.push(clip_xa);

}

function setup() {
    frameRate(fr);

// REMPLACER PAR UN MAP //
    for (var track of all_tracks) {

        loadTrack(track);

        console.log("track, " + track + " nbr of clips : " + track.clips.length);
        for (var clip of track.clips) {
            
            console.log(clip);
            loadDrumRack_clip(track, clip);
        }
    }

    kick1.setVolume(1.0);
    kick1.playMode("restart");
    snare.setVolume(1.0);
    snare.playMode("restart");
    hhclosed.setVolume(1.0);
    hhclosed.playMode("restart");
    clap.setVolume(1.0);
    clap.playMode("restart");

//////////////////////////////////////////
    

//////////////////////////////////////////

//    update();
}

function draw () {

    //  A netoyer ?? // ( simplifier le code d'incrémentation )
    bar = 60 / bpm * 1000 * 4;
    step = bar / stepsResolution;
}

function update() {
//////////////////////////////////////////////
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
}

function sessionPlay () {

    sessionStop();

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


function previousSteps () {

    for (var track of all_tracks) {

            track.currentClip -= 1;

            console.log(track.currentClip);
    }
}

function nextSteps () {

    for (var track of all_tracks) {

            track.currentClip += 1;
            
            console.log(track.currentClip);            
    }
}

function launchSteps (step) {


    for (var i = 0; i < all_tracks.length; i++) {
        var track = all_tracks[i];

        for (var j = 0; j <= track.channels.length; j++) {

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

function clip_Edit (track_ID, clip_ID) {

        console.log("track, " + all_tracks[track_ID] + " nbr of channels : " + all_tracks[track_ID].channels.length);
        document.getElementById("clip-container").innerHTML = `<div id="steps-container"></div>`;        
        for (var channel of all_tracks[track_ID].channels) {    
            loadDrumRack_Steps(channel);
        }  
}

function clip_Launch (track_ID, clip_ID) {
    
    all_tracks[track_ID].currentClip = clip_ID;

    if(!isPlaying)
    sessionPlay (); 
}

function loadTrack (track) {
//pour le "create new track"
    // var track = new Track(type);
    
    var tracksContainer = document.getElementById("tracks-container");
    var ttemplate = new track_Template(track);
    tracksContainer.innerHTML += ttemplate.html;
}

function loadDrumRack_Steps (channel, id) {
    
    if (channel != null) {
        var drumRackContainer = document.getElementById("steps-container");
        console.log("loaddrumRack_Steps : " + channel.sample);
        var drtemplate = new drumRackSteps_Template(channel, id);
        drumRackContainer.innerHTML += drtemplate.html;
    }
}

function loadDrumRack_clip (track, clip) {

    var clipsContainer = document.getElementById(track.name);
    var cliptemplate = new drumRackClip_Template(track, clip);
    clipsContainer.innerHTML += cliptemplate.html;

    // var stepsContainer = document.getElementById("steps-container");
    // var stepstemplate = new drumRackSteps_Template(clip);
    // stepsContainer.innerHTML += stepstemplate.html;
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