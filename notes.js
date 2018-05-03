var C = [65.41, 130.81, 261.63, 523.25, 1046.5, 2093];
var CS = [69.3, 138.59, 277.18, 554.37, 1108.73, 2217.46];
var D = [73.42, 146.83, 293.66, 587.33, 1174.66, 2349.32];
var DS = [77.78, 155.56, 311.13, 622.25, 1244.51, 2489.02];
var E = [82.41, 164.81, 329.63, 659.26, 1318.51, 2637.02];
var F = [87.31, 174.61, 349.23, 698.46, 1396.91, 2793.83];
var FS = [92.5,185,369.99,739.99,1479,98,2959.96];
var G = [98, 196, 392, 783.99, 1567.98, 3135.96];
var GS = [103.83, 207.65, 415.3, 830.61, 1661.22, 3322.44];
var A = [110, 220, 440, 880, 1760, 3520];
var AS = [116.54, 233.08, 466.16, 932.33, 1864.66, 3729.31];
var B = [123.47, 246.94, 493.88, 987,77, 1975.53, 3951.07];

// 			 0 1  2 3  4 5 6  7 8  9 10 11
var notes = [C,CS,D,DS,E,F,FS,G,GS,A,AS,B];

scale_chrom = genScale([0,1,2,3,4,5,6,7,8,9,10,11])
scale_cmajor = genScale([0,2,4,5,7,9,11]);
scale_cminor = genScale([0,2,3,5,7,8,10]);


function genScale(sequence) {
	var tempscale = [];
	for(var x = 0; x < 6; x++) {
		for(var y = 0; y < sequence.length; y++) {
			tempscale[(sequence.length*x)+y] = notes[sequence[y]][x];
		}
	}
	return tempscale;
}

function note(scale,o,i) {
	var scalelength = scale.length/6;
	i += o*6;
	return scale[i];
}
