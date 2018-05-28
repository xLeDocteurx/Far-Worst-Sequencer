var fr = 50;

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

// var kick1;
// var channel_xx;
// var kick2;
// var channel_xy;
// var snare;
// var channel_xz;
// var clap;
// var channel_xa;
// var hhclosed;
// var channel_xb;
// var voxhit;
// var channel_xc;
// var chor1;
// var channel_xd;
// var chor2;
// var channel_xe;
// var trumpet1;
// var channel_xf;
// var trumpet2;
// var channel_xg;
// var trumpet3;
// var channel_xh;


////////////////////// CONVERT AND IMPORT JSON AS SAVE FILES /////////////////////////
var receptJSON;
function convertJSON(file) {

    var requestURL = `../JSON/${file}.json`;
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        receptJSON = request.response;        
        // receptJSON.images.map(x => images.push(x));
    }
}
convertJSON();
//////////////////////////////////////////////

//////////////////////////////////////////////
function preload() {

/*
    kick = document.createElement("audio");
    kick.scr = "../UI/sounds/kick.wave";
 */

    var track_xx = new Track(all_tracks.length, "Drum Rack");

    all_tracks.push(track_xx);

    console.log(receptJSON.samplePacks[0].length);
    for (var obj of receptJSON.samplePacks[0].samples) {
        
        var sample = loadSound(obj.path);
        var channel = new drumRack_Channel (all_tracks[0].channels.length, sample);
        all_tracks[0].channels.push(channel);
    }
    
    // kick1 = loadSound("./factory_samples/mad_zack/Satin_Charly/kick1.wav");
    // kick2 = loadSound("./factory_samples/mad_zack/Satin_Charly/kick2.wav");
    // snare = loadSound("./factory_samples/mad_zack/Satin_Charly/snare.wav");
    // hhclosed = loadSound("./factory_samples/mad_zack/Satin_Charly/hhc.wav");
    // clap = loadSound("./factory_samples/mad_zack/Satin_Charly/clap.wav");
    // voxhit = loadSound("./factory_samples/mad_zack/Satin_Charly/00_voxhit.wav");
    // chor1 = loadSound("./factory_samples/mad_zack/Satin_Charly/chorus1.wav");
    // chor2 = loadSound("./factory_samples/mad_zack/Satin_Charly/chorus2.wav");
    // trumpet1 = loadSound("./factory_samples/mad_zack/Satin_Charly/trumpet1.wav");
    // trumpet2 = loadSound("./factory_samples/mad_zack/Satin_Charly/trumpet2.wav");
    // trumpet3 = loadSound("./factory_samples/mad_zack/Satin_Charly/trumpet3.wav");
    
    

    // channel_xx = new drumRack_Channel (all_tracks[0].channels.length, kick1);
    // all_tracks[0].channels.push(channel_xx);
    
    // channel_xy = new drumRack_Channel (all_tracks[0].channels.length, kick2);
    // all_tracks[0].channels.push(channel_xy);
    
    // channel_xz = new drumRack_Channel (all_tracks[0].channels.length, snare);
    // all_tracks[0].channels.push(channel_xz);

    // channel_xa = new drumRack_Channel (all_tracks[0].channels.length, clap);
    // all_tracks[0].channels.push(channel_xa);

    // channel_xb = new drumRack_Channel (all_tracks[0].channels.length, hhclosed);
    // all_tracks[0].channels.push(channel_xb);

    // channel_xc = new drumRack_Channel (all_tracks[0].channels.length, voxhit);
    // all_tracks[0].channels.push(channel_xc);
    
    // channel_xd = new drumRack_Channel (all_tracks[0].channels.length, chor1);
    // all_tracks[0].channels.push(channel_xd);

    // channel_xe = new drumRack_Channel (all_tracks[0].channels.length, chor2);
    // all_tracks[0].channels.push(channel_xe);

    // channel_xf = new drumRack_Channel (all_tracks[0].channels.length, trumpet1);
    // all_tracks[0].channels.push(channel_xf);

    // channel_xg = new drumRack_Channel (all_tracks[0].channels.length, trumpet2);
    // all_tracks[0].channels.push(channel_xg);

    // channel_xh = new drumRack_Channel (all_tracks[0].channels.length, trumpet3);
    // all_tracks[0].channels.push(channel_xh);


    clip_xx = new DrumRack_Clip(all_tracks[0].clips.length, 1,
                                   [[1],[],[],[],
                                    [4],[],[],[],
                                    [1],[],[1],[],
                                    [4],[1],[],[6]]);
                                    
    all_tracks[0].clips.push(clip_xx);

    clip_xy = new DrumRack_Clip(all_tracks[0].clips.length, 1, 
                                   [[1],[],[5],[],
                                    [3],[],[5],[],
                                    [1],[],[5],[],
                                    [3],[],[5],[5]]);
    
    all_tracks[0].clips.push(clip_xy);

    clip_xz = new DrumRack_Clip(all_tracks[0].clips.length, 1, 
                                   [[1],[],[5],[],
                                    [1],[],[5],[],
                                    [1],[],[5],[],
                                    [1],[],[5],[]]);
    
    all_tracks[0].clips.push(clip_xz);

    clip_xa = new DrumRack_Clip(all_tracks[0].clips.length, 1, 
                                   [[1],[5],[5],[5],
                                    [3,5],[5],[5],[5],
                                    [1],[5],[5],[5],
                                    [3,5,5],[5],[5],[5]]);
    
    all_tracks[0].clips.push(clip_xa);

}

function setup() {

    console.table(all_tracks);

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

    for (var channel of all_tracks[0].channels) {
        channel.sample.setVolume(1.0);
        channel.sample.playMode(receptJSON.samplePacks[0].samples[channel.index].playmode);
    }

    // kick1.setVolume(1.0);
    // kick1.playMode("restart");
    // snare.setVolume(1.0);
    // snare.playMode("restart");
    // hhclosed.setVolume(1.0);
    // hhclosed.playMode("restart");
    // clap.setVolume(1.0);
    // clap.playMode("restart");
    // voxhit.setVolume(1.0);
    // voxhit.playMode("restart");
    // chor1.setVolume(1.0);
    // chor1.playMode("restart");
    // chor2.setVolume(1.0);
    // chor2.playMode("restart");
    // trumpet1.setVolume(1.0);
    // trumpet1.playMode("restart");
    // trumpet2.setVolume(1.0);
    // trumpet2.playMode("restart");
    // trumpet3.setVolume(1.0);
    // trumpet3.playMode("restart");

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
        document.getElementById("clip-container").innerHTML = `<div id="channels-container">
                                                                    <div id="channels-guide">
                                                                    </div>
                                                                </div>`;        
        for (var channel of all_tracks[track_ID].channels) {    
            loadDrumRack_Channel(channel, track_ID, clip_ID);
        }  
}

function editStep(thiss, step, trackID, channelID, clipID) {
///////////////////////////////////

var track = all_tracks[trackID];
var clip = track.clips[clipID];
var steps = clip.steps;

var index = clip.steps.indexOf(step);
// var index = step;

// console.log("track : " + track);
// console.log("clip : " + clip);
console.log("steps : " + steps);
// console.table("channel : " + channelID);
// console.log("step : " + index);

    if (thiss.checked == false) {
        var supr = clip.steps[step].splice(index, 1);
        console.log("element supprimé : " + supr);
        console.log(supr);
    } else {
        console.log(step);
        clip.steps[step].splice(0, 0, track.channels[channelID].id + 1);
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

/////// Y INTEGRER LE FOR OF DE LA BOUCLE DE CHARGEMENT DU SETUP
function loadDrumRack_Channel (channel, trackID, clipID) {
    
    var track = all_tracks[trackID];
    var clip = track.clips[clipID];
  // var channel = track.channels[j - 1];

    if (channel != null) {
        var channelsGuide = document.getElementById("channels-guide");
        console.log("loaddrumRack_Channel : " + channel.sample);
        var drtemplate = new drumRackChannel_Template(channel, clipID);

        insertAfter(channelsGuide, drtemplate.element);
        ////////// RAJOUT DES STEPS DE LA PISTE //////////
        for (var step of clip.steps) {
            var drclips = new stepTemplate(track, channel, clip, step);        
//            drtemplate.appendChild(drclips);
            document.getElementById(`${channel.name + "_currentClip"}`).appendChild(drclips.element);
        }

    }
}

//////////////////////////////////
///////////////////////////
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}
//////////////////////////////////
///////////////////////////
function loadDrumRack_clip (track, clip) {

    var clipsContainer = document.getElementById(track.name);
    var cliptemplate = new drumRackClip_Template(track, clip);
    clipsContainer.innerHTML += cliptemplate.html;

    // var stepsContainer = document.getElementById("channels-container");
    // var stepstemplate = new drumRackChannel_Template(clip);
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