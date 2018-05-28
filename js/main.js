var fr = 50;
var makeymakeyMode = false;

var isPlaying = false;

var bpm = 105;
var step_Type = 4;
//var bar_type = 4;
 
var bar = 60 / bpm * 1000;
var stepsResolution = 16;

var step = bar / stepsResolution;

///////////////////////////////////////////////
var currentStep = 0;
var update_timeout;

var all_tracks = [];

////////////////////// CONVERT AND IMPORT JSON AS SAVE FILES /////////////////////////
var samplePackSamples = [];
convertJSON("JSON/save.json");

function convertJSON(fileURL) {

    var requestURL = fileURL;
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function () {
        var diapo = request.response;        
        diapo.samplePack.samples.map(x => samplePackSamples.push(x.path));
        // console.log(samplePackSamples);
    }
}

//////////////////////////////////////////////

var wiked;
var jungleismassive;
var ting;
var yo;
//////////////////////////////////////////////
function preload() {

/*
    kick = document.createElement("audio");
    kick.scr = "../UI/sounds/kick.wave";
 */

    var track_xx = new Track(all_tracks.length, "Drum Rack");
    all_tracks.push(track_xx);

    for (var item of samplePackSamples) {

        var sample = loadSound(item);

        var channel = new drumRack_Channel (all_tracks[0].channels.length, sample);
        all_tracks[0].channels.push(channel);
    }

    wiked = loadSound("./factory_samples/wiked.aiff");
    jungleismassive = loadSound("./factory_samples/jungleismassive.aiff");
    ting = loadSound("./factory_samples/ting.aiff");
    yo = loadSound("./factory_samples/yo.mp3");
    



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

        // console.log("track, " + track + " nbr of clips : " + track.clips.length);
        for (var clip of track.clips) {
            
            // console.log(clip);
            loadDrumRack_clip(track, clip);
        }
    }

    // for (var channel of all_tracks[0].channels) {
    //     channel.sample.setVolume(1.0);
    //     channel.sample.playMode(samplePackSamples.samples[channel.index].playmode);
    // }

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

function changemakeymakeyMode () {

    if (makeymakeyMode == true) {
        makeymakeyMode = false;
        console.log("makeymakeyMode : " + makeymakeyMode);
    } else {
        makeymakeyMode = true;
        console.log("makeymakeyMode : " + makeymakeyMode);
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