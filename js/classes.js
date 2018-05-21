

class Track {

    constructor (type)  {

        this.type = type;
        this.name = type;

        this.channels = new Array(16);

        this.currentClip = 0;
        this.clips = [];
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