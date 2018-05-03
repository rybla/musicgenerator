function createTrack(track) {

	track.setTempo(120);
	track.setInstrument(0, 0x13);
	
	track.addNote(0, 'c4', 64);
	track.addNote(0, 'd4', 64);
	track.addNote(0, 'e4', 64);
	track.addNote(0, 'f4', 64);
	track.addNote(0, 'g4', 64);
	track.addNote(0, 'a4', 64);
	track.addNote(0, 'b4', 64);
	track.addNote(0, 'c5', 64);

	track.addNoteOn(0, 'c4', 64);
	track.addNoteOn(0, 'e4');
	track.addNoteOn(0, 'g4');
	track.addNoteOff(0, 'c4', 47);
	track.addNoteOff(0, 'e4');
	track.addNoteOff(0, 'g4');

	track.addNoteOn(0, 'c4', 1);
	track.addNoteOn(0, 'e4');
	track.addNoteOn(0, 'g4');
	track.addNoteOff(0, 'c4', 384);
	track.addNoteOff(0, 'e4');
	track.addNoteOff(0, 'g4');

	return track;
}