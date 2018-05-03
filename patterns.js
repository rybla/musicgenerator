function scaleup(scale, startnote, octave, length, skips) {
	var output = [];
	var octavesize = scale.length/6;
	for(var x = 0; x < length; x++) {
		output[x] = scale[(octavesize*octave)+startnote+(x*skips)];
	}
	return output;
}

function scaledown(scale, startnote, octave, length, skips) {
	var output = [];
	var octavesize = scale.length/6;
	for(var x = 0; x < length; x++) {
		output[x] = scale[(octavesize*octave)+startnote-(x*skips)];
	}
	return output;
}

// length of output will be 2*length
function scaleupdown(scale, startnote, octave, length, skips) {
	var output = [];
	var octavesize = scale.length/6;
	for(var x = 0; x < length; x++) {
		output[x] = scale[(octavesize*octave)+startnote+(x*skips)];
	}
	for(var x = length; x < length*2-1; x++) {
		output[x] = scale[(octavesize*octave)+startnote-(x*skips)];
	}
	return output;
}

// length of output will be 2*length
function scaledownup(scale, startnote, octave, length, skips) {
	var output = [];
	var octavesize = scale.length/6;
	for(var x = 0; x < length; x++) {
		output[x] = scale[(octavesize*octave)+startnote-(x*skips)];
	}
	for(var x = length; x < length*2-1; x++) {
		output[x] = scale[(octavesize*octave)+startnote+(x*skips)+1];	
	}
	return output;
}

