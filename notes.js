var A = [110, 220, 440, 880, 1760, 3520];
var AS = [116.54, 233.08, 466.16, 932.33, 1864.66, 3729.31];
var B = [123.47, 246.94, 493.88, 987,77, 1975.53, 3951.07];
var C = [65.41, 130.81, 261.63, 523.25, 1046.5, 2093];
var CS = [69.3, 138.59, 277.18, 554.37, 1108.73, 2217.46];
var D = [73.42, 146.83, 293.66, 587.33, 1174.66, 2349.32];
var DS = [77.78, 155.56, 311.13, 622.25, 1244.51, 2489.02];
var E = [82.41, 164.81, 329.63, 659.26, 1318.51, 2637.02];
var F = [87.31, 174.61, 349.23, 698.46, 1396.91, 2793.83];
var FS = [92.5,185,369.99,739.99,1479,98,2959.96];
var G = [98, 196, 392, 783.99, 1567.98, 3135.96];
var GS = [103.83, 207.65, 415.3, 830.61, 1661.22, 3322.44];


// TODO: define keys

scalechrom = [
	[C[0],CS[0],D[0],DS[0],E[0],F[0],FS[0],G[0],GS[0],A[0],AS[0],B[0]],
	[C[1],CS[1],D[1],DS[1],E[1],F[1],FS[1],G[1],GS[1],A[1],AS[1],B[1]],
	[C[2],CS[2],D[2],DS[2],E[2],F[2],FS[2],G[2],GS[2],A[2],AS[2],B[2]],
	[C[3],CS[3],D[3],DS[3],E[3],F[3],FS[3],G[3],GS[3],A[3],AS[3],B[3]],
	[C[4],CS[4],D[4],DS[4],E[4],F[4],FS[4],G[4],GS[4],A[4],AS[4],B[4]],
	[C[5],CS[5],D[5],DS[5],E[5],F[5],FS[5],G[5],GS[5],A[5],AS[5],B[5]],
];

scalecm = [
			[C[0],D[0],E[0],F[0],G[0],A[0],B[0]],
			[C[1],D[1],E[1],F[1],G[1],A[1],B[1]],
			[C[2],D[2],E[2],F[2],G[2],A[2],B[2]],
			[C[3],D[3],E[3],F[3],G[3],A[3],B[3]],
			[C[4],D[4],E[4],F[4],G[4],A[4],B[4]],
			[C[5],D[5],E[5],F[5],G[5],A[5],B[5]],
];

// basenote is position in chromscale
// sequence: 2's equal whole notes, 1's equal half notes
function genScale(basenote, sequence) {
	var output = [[],[],[],[],[],[]];
	var halfsteps=0;
	var wholesteps=0;
	for(var x = 0; x < sequence.length; x++) {
		if(sequence[x] == 1) {
			halfsteps++;
		} else if(sequence[x]==2){
			wholesteps++;
		}
	}

	var c = 0;
	var scalesize = 1;
	while(c<12) {
		for(var x = 0; x < sequence.length; x++) {
			c += sequence[x];
			if(c>12) {
				break;
			} else {
				scalesize++;
			}
		}
	}

	for(var x = 0; x < scalechrom.length; x++) {
		output[x][0] = scalechrom[x][basenote];
	}

	for(var x = 0; x < output.length; x++) {
		c = 0;
		var z = 0;
		for(var y = 0; y < scalesize; y++) {
			c+=sequence[z];
			// console.log(scalechrom[x][c] + ": (" + x + "," + c + ")");
			output[x][y] = scalechrom[x][c];
			
			z++;
			if(z > sequence.length-1) z -= sequence.length;
		}
	}
	
	return output;
}

function note(scale,o,i) {
	length = scale[o].length;
	// if(o == 2 && i == 7) {
	// 	console.log("length: " + length);
	// 	console.log("i - length: " + (i-length));
	// 	console.log("o++: " + (o+1));
	// }
	while(i > length || i < 0) {
		if(i > (length - 1)) {
			o++;
			i -= length;
		} else if(i < 0) {
			o--;
			i += length;
		}	
	}
	// console.log(i)
	return scale[o][i];
}
