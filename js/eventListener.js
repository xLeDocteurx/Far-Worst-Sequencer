// var makeyTrack = all_tracks[0];
// console.table(makeyTrack);

document.addEventListener('keypress', (event) => {
    if (makeymakeyMode == true) {
        const keyName = event.key;
        // console.log(keyName);
        if (keyName == "ArrowLeft") {
            // all_tracks[0].channels[0].sample.play();
            wiked.play();
        } else if (keyName == "ArrowRight") {
            // all_tracks[0].channels[5].sample.play();
            jungleismassive.play();
        } else if (keyName == "ArrowUp") {
            // all_tracks[0].channels[2].sample.play();
            ting.play();
        } else if (keyName == "ArrowDown") {
            // all_tracks[0].channels[3].sample.play();
            // yo.playMode("restart");
            yo.play();
        } else if (keyName == " ") {
            all_tracks[0].channels[4].sample.play();
        }
    }
});
