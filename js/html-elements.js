

function track_Template (track) {
    
    this.html = "<div id='" + track.name + "' type=\"button\" class=\"channel border rounded\">" + 
                    "<div>" + 
                    track.name + 
                    "</div>" + 
                    "<div class=\"progress\"><div class=\"progress-bar progress-bar-striped bg-info\" role=\"progressbar\" style=\"width: 65%\" aria-valuenow=\"65\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div></div>" + 
                "</div>";
}

function drumRackSteps_Template (channel) {

    var filename = channel.name;

    this.html = `<div id="${filename}" class="row border">
                    <div class="col-sm-1 border">
                        ${filename} : 
                    </div>
                    <div id="${filename + "_currentClip"}" class="col border">
                        
                        <!-- A instancier depuis le chargement des clips -->
                        <input type='checkbox'><input type='checkbox'><input type='checkbox'><input type='checkbox'>
                        <input type='checkbox'><input type='checkbox'><input type='checkbox'><input type='checkbox'>
                        <input type='checkbox'><input type='checkbox'><input type='checkbox'><input type='checkbox'>
                        <input type='checkbox'><input type='checkbox'><input type='checkbox'><input type='checkbox'>
                    </div>
                </div>`;
}

function drumRackClip_Template (track, clip) {
    
    this.html = `<div>
                    <div class='btn-group' role='group' aria-label='Basic example'>
                        <button type='button' class='btn' onclick="clip_Edit(${track.id}, ${clip.id});">Clip ${clip.id}</button>
                        <button type='button' class='btn launch-btn' onclick="clip_Launch(${track.id}, ${clip.id});">Launch</button>
                    </div>
                </div>`;
}

// function drumRackSteps_Template (clip) {
    
//     this.html = "CLIP<br>";
// }