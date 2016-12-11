// Example showing how to produce a tone using Web Audio API.
// Load the file webaudio_tools.js before loading this file.
// This code will write to a DIV with an id="soundStatus".
var oscillator;
var amp;

// Create an oscillator and an amplifier.
function initAudio()
{
    // Use audioContext from webaudio_tools.js
    if( audioContext )
    {
        oscillator = audioContext.createOscillator();
        fixOscillator(oscillator);
        oscillator.frequency.value = 440;
        amp = audioContext.createGain();
        amp.gain.value = 0;
    
        // Connect oscillator to amp and amp to the mixer of the audioContext.
        // This is like connecting cables between jacks on a modular synth.
        oscillator.connect(amp);
        amp.connect(audioContext.destination);
        oscillator.start(0);
        writeMessageToID( "soundStatus", "<p>Audio initialized.</p>");
    }
}

var activenoteindex = -1;

// Set the frequency of the oscillator and start it running.
function startTone(frequency)
{
    var now = audioContext.currentTime;
    
    oscillator.frequency.setValueAtTime(frequency, now);
    
    // Ramp up the gain so we can hear the sound.
    // We can ramp smoothly to the desired value.
    // First we should cancel any previous scheduled events that might interfere.
    amp.gain.cancelScheduledValues(now);
    // Anchor beginning of ramp at current value.
    amp.gain.setValueAtTime(amp.gain.value, now);
    amp.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.1);
    
    writeMessageToID( "soundStatus", "<p>Play tone at frequency = " + frequency  + "</p>");

    if(activenoteindex == -1) {
    	activenoteindex = getRandomInt(0,5);
    	document.getElementById("noteblack").style.opacity = 0;
    } else {
    	icons[activenoteindex].style.opacity = 0;
    }

    activenoteindex = getRandomInt(0,5);

    icons[activenoteindex].style.opacity = 1;
    icons[activenoteindex].style.left = 350 + frequency/2 + "px";
}

function stopTone()
{
    var now = audioContext.currentTime;
    amp.gain.cancelScheduledValues(now);
    amp.gain.setValueAtTime(amp.gain.value, now);
    amp.gain.linearRampToValueAtTime(0.0, audioContext.currentTime + 1.0);
    // writeMessageToID( "soundStatus", "<p>Stop tone.</p>");
}

function playTone(scale,octave,index,duration) {
	frequency = note(scale,octave,index);
	// console.log(frequency + ":" + octave + "," + index);
	setTimeout(startTone, runningdelay, frequency);
	runningdelay += duration;
	setTimeout(stopTone, runningdelay);
}
var runningdelay = 0;

function pause(duration) {
	runningdelay += duration;	
}

var time = 0;

var octaveparam = 0;
var scaleparam;
var phraselength = 0;
var bounded;

function playTune() {
	getParams();
	var previousnote = 0;
	var x = 0;
	while(x < phraselength) {
		// possible: -3,-2,-1,0,1,2,3,4
		var z = getRandomInt(0,99);
		if(z < toneparams[0]) {
			z = -4;
		} else if(z < toneparams[1]) {
			z = -3;
		} else if(z < toneparams[2]) {
			z = -2;
		} else if(z < toneparams[3]) {
			z = 1;
		} else if(z < toneparams[4]) {
			z = 0;
		} else if(z < toneparams[5]) {
			z = 1;
		} else if(z < toneparams[6]) {
			z = 2;
		} else if(z < toneparams[7]) {
			z = 3;
		} else if(z < toneparams[8]) {
			z = 4;
		}
		
		var l = getRandomInt(0,99);
		if(l < lengthparams[0]) {
			l = 0.25;
		} else if(l < lengthparams[1]) {
			l = 0.125;
		} else if(l < lengthparams[2]) {
			l = 0.0625;
		} else if(l < lengthparams[3]) {
			l = 0.03125;
		}

		previousnote += z;
		if(bounded) {
			playTone(scaleparam, octaveparam, z, time*l);
		} else {
			playTone(scaleparam, octaveparam, previousnote, time*l);
		}
		
		pause(time*l);

		x++;
	}

}

function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
}

var toneparams = [];
var lengthparams = [];
function getParams() {
	toneparams = [];
	lengthparams = [];
	var runningvalue = 0;
	var value = 0;
	for(var x = 0; x < 9; x++) {
		value = parseInt(document.getElementById("%" + (x-4)).value);
		toneparams[x] = value + runningvalue;
		runningvalue += value;
	}

	if(runningvalue != 100) { 
		writeMessageToID( "toneParamStatus", "<p>Tones %'s don't add to 100%</p>"); 
	} else {
		writeMessageToID( "toneParamStatus", ""); 
	}

	runningvalue = 0;
	value = 0;

	for(var x = 0; x < 4; x++) {
		value = parseInt(document.getElementById("%l" + x).value);
		lengthparams[x] = value + runningvalue;
		runningvalue += value;
	}

	if(runningvalue != 100) { 
		writeMessageToID( "lengthParamStatus", "<p>Length %'s don't add to 100%</p>"); 
	} else {
		writeMessageToID( "lengthParamStatus", ""); 
	}

	octaveparam = parseInt(document.getElementById("octave").value);
	time = parseInt(document.getElementById("time").value);
	phraselength = parseInt(document.getElementById("phraselength").value);

	var scaletext = document.getElementById("scale").value;
	if(scaletext == "scalecm") {
		scaleparam = scalecm;
	} else if(scaletext = "scalechrom") {
		scaleparam = scalechrom;
	}

	var radios = document.getElementsByName('bounded');
	if(radios[0].checked) bounded = true;
	else if(radios[1].checked) bounded = false;
	
}

// frequency range: 110 - 3322.44

// init once the page has finished loading.
window.onload = initAudio;
