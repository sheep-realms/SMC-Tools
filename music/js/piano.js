function pianoLoad() {
    let $piano = $('#piano');
    let note = -18;
    let noteList     = [1,   0,    1,   0,    1,   1,    0,   1,   0,    1,   0,    1];
    let noteCodeName = ["C", "CX", "D", "DX", "E", "F", "FX", "G", "GX", "A", "AX", "B"];
    let noteName     = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B",];
    let octaveName   = ["零", "一", "二", "三", "四", "五", "六", "七", "八"];
    let pianoKey     = ["A", "Z", "S", "X", "D", "C", "V", "G", "B", "H", "N", "M", "K", "< Q", "L 2", "> W", ": 3", "/ F", "R", "5", "T", "6", "Y", "U", "8"];
    let beOnlyClass = "";
    let pianoKeyObj = "";
    for (octave = 0; octave <= 8; octave++) {
        $piano.append('<div id="octave-'+octave+'" class="octave"><div class="octave-name">第'+octaveName[octave]+'八度</div></div>');
        let $thisOctave = $('#octave-'+octave);
        for (i = 0; i < noteList.length; i++) {
            if (note > 24 || note < 0) {
                beOnlyClass = " be-only";
                pianoKeyObj = "";
            } else {
                beOnlyClass = "";
                pianoKeyObj = '<div class="notekey">'+pianoKey[note]+'</div>';
            }
            if (noteList[i] == 1) {
                $thisOctave.append('<div class="note-key note-white note-'+note+' note-'+noteCodeName[i]+beOnlyClass+'" data-note="'+note+'"><div class="note">'+note+'</div><div class="name">'+noteName[i]+'</div>'+pianoKeyObj+'</div>');
            } else {
                $thisOctave.append('<div class="note-key note-black note-'+note+' note-'+noteCodeName[i]+beOnlyClass+'" data-note="'+note+'"><div class="note">'+note+'</div><div class="name">'+noteName[i]+'</div>'+pianoKeyObj+'</div>');
            }
            note++;
        }
    }
    pianoPosReset();
}

pianoLoad();

function pianoPosReset() {
    $('#piano').scrollLeft(690);
}