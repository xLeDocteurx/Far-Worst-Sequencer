

class Track {

    constructor (id, type)  {

        this.id = id;
        this.type = type;
        this.name = this.type + "_" + this.id;

        // this.channels = new Array(16);
        this.channels = [];

        this.currentClip = 0;
        this.clips = [];
    }
}

class drumRack_Steps {

// Un systeme d'id pour éviter les problemes de réorganisation 
// des array lors de la suppression d'un channel 
    constructor (id, sample) {
        
//        this.steps = new Array(stepsResolution);
        this.id = id;
        this.name = sample.url.substring(sample.url.lastIndexOf('/')+1);
        this.sample = sample;
    }
}

class DrumRack_Clip {

    constructor (id, barsLength, steps) {
        
        this.id = id;
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