

function track_Template (track) {

    this.html = "<div id='" + track.name + "' type=\"button\" class=\"channel border rounded\">" + 
                    "<div>" + 
                    track.name + 
                    "</div>" + 
                    "<div class=\"progress\"><div class=\"progress-bar progress-bar-striped bg-info\" role=\"progressbar\" style=\"width: 65%\" aria-valuenow=\"65\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div></div>" + 
                "</div>";
}

function drumRackChannel_Template (channel) {

    this.html = "<div id='" + channel.sample.name + "' class='row border'>" +
                    "<div class='col-sm-1 border'>" +
                    "    " + channel.sample.name + " : " +
                    "</div>" +
                    "<div id='" + channel.sample.name + "_currentClip" + "' class='col border'>" +
                    // A instancier depuis le chargement des clips 
                    //     "<input type='checkbox'><input type='checkbox'><input type='checkbox'><input type='checkbox'>" +
                    //     "<input type='checkbox'><input type='checkbox'><input type='checkbox'><input type='checkbox'>" +
                    //     "<input type='checkbox'><input type='checkbox'><input type='checkbox'><input type='checkbox'>" +
                    //     "<input type='checkbox'><input type='checkbox'><input type='checkbox'><input type='checkbox'>" +
                    // "</div>" +
                "</div>";
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