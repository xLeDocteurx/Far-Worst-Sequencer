var start = Date.now();

var bpm = 128;
var step_Type = 4;
var bar_type = 4;
 
var interval;



/* a envoyer plus tard vers le script "sequencer" sur un channel */

var sound;

/* Le moteur */
Start();
setInterval(Update(),2000);

function Start() {

    Clock.isPlaying = true;

}

function Update() {

    Clock.tick();
    console.log("time elapsed since begining : " + Clock.timeElapsed() );
}

function loadSound(sample, channel) {

    var reader = new FileReader();
    reader.onload = function (e) {
      $('#sound_file')
        .attr('src', e.target.result);
        sound = e.target.result;
    };
    reader.readAsDataURL(sample.files[0]);
}

var Clock = {

    "isPlaying" : false,

    "timeElapsed" : function () {

        var now = Date.now();
        var timeSinceStart = (now - start) / 1000;
    
        return timeSinceStart;
    },

    "setBPM" : function () {
        
    },

    "tick" : function () {

    }
};