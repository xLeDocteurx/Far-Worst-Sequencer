var makeyTrack = all_tracks[0];
console.table(makeyTrack);

document.addEventListener('keypress', (event) => {
    const keyName = event.key;
    console.log(keyName);
    if (keyName == "ArrowLeft") {
        console.log("Key pressed" + keyName);
        all_tracks[0].channels[0].sample.play();
    } else if (keyName == "ArrowRight") {
        console.log("Key pressed" + keyName);
        all_tracks[0].channels[1].sample.play();
    } else if (keyName == "ArrowUp") {
        console.log("Key pressed" + keyName);
        all_tracks[0].channels[2].sample.play();
    } else if (keyName == "ArrowDown") {
        console.log("Key pressed" + keyName);
        all_tracks[0].channels[3].sample.play();
    } else if (keyName == " ") {
        console.log("Key pressed" + keyName);
        all_tracks[0].channels[4].sample.play();
    }
});
