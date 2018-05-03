var musictext = "";

var lengthofphrase = 0;
var bounded = true;

// ind_0: +/- 0, ind_1: +/- 1, etc.
var tonevolitilities = [0,0,0,0,0,0,0];
var totaltonevolitilities = 0;

// ind_0: whole, ind_1: half, etc.
var durationvolitilities = [0,0,0,0];
var totaldurationvolitilities = 0;

class N {
	constructor(tone, duration) {
		this.tone = tone;
		this.duration = duration;
	}

	addTone(add) {
		this.tone += add;
	}

	setTone(t) {
		this.tone = t;
	}

	setDuration(dur) {
		this.duration = dur
	}

	getString() {
		return this.tone + ":" + this.duration + " ";
	}

	record() {
		musictext += this.getString();
	}
}

function genMusictText() {
	musictext = "";
	totaltonevolitilities = 0;
	totaldurationvolitilities = 0;

	// set all varables
	lengthofphrase = parseInt($("#lengthofphrase").val());
	for(var i = 0; i < tonevolitilities.length; i++) {
		totaltonevolitilities += parseInt($("#tonevolitility" + i).val());
		tonevolitilities[i] = totaltonevolitilities;
		// console.log("tonevolitilities[" + i + "]: " + tonevolitilities[i]);
	}
	for(var i = 0; i < durationvolitilities.length; i++) {
		totaldurationvolitilities += parseInt($("#duration" + i).val());
		durationvolitilities[i] = totaldurationvolitilities;
		// console.log("durationvolitilities[" + i + "]: " + durationvolitilities[i]);
	}

	bounded = $('input:radio[name=bounded]:checked').val();

	// first note, to start off
	var tempdur = (Math.floor(Math.random() * 3) + 1) * 2; // (1,4)
	var previousnote = new N(0,tempdur);
	previousnote.record();

	// generate notes
	for(var i = 0; i < lengthofphrase; i++) {
		var tonerand = Math.floor(Math.random() * totaltonevolitilities);
		var durrand = Math.floor(Math.random() * totaldurationvolitilities);

		var addtone = 0;
		var tonedir = ((Math.floor(Math.random()*2)) * 2) - 1;
		var dur = 0;

		console.log("tonedir: " + tonedir);

		// console.log("tonerand: " + tonerand);

		// +/-0, +/-1, +/-2, ...
		if(tonerand <= tonevolitilities[0]) {
			addtone = 0 * tonedir;
		} else if(tonerand <= tonevolitilities[1]) {
			addtone = 1 * tonedir;
		} else if(tonerand <= tonevolitilities[2]) {
			addtone = 2 * tonedir;
		} else if(tonerand <= tonevolitilities[3]) {
			addtone = 3 * tonedir;
		} else if(tonerand <= tonevolitilities[4]) {
			addtone = 4 * tonedir;
		} else if(tonerand <= tonevolitilities[5]) {
			addtone = 5 * tonedir;
		} else if(tonerand <= tonevolitilities[6]) {
			addtone = 6 * tonedir;
		}
		
		// whole, half, quarter, eighth
		if(durrand <= durationvolitilities[0]) {
			dur = 4;
		} else if(durrand <= durationvolitilities[1]) {
			dur = 2;
		} else if(durrand <= durationvolitilities[2]) {
			dur = 1;
		} else if(durrand <= durationvolitilities[3]) {
			dur = 0.5;
		}

		// console.log("addtone: " + addtone);
		// console.log("dur: " + dur);

		if(bounded) {
			previousnote.setTone(addtone);
		} else {
			previousnote.addTone(addtone);	
		}
		
		previousnote.setDuration(dur);

		previousnote.record();

		setOutput();
	}
}

function setOutput() {
	$("#outputpar").text(musictext);
}