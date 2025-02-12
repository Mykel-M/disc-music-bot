// songstate.js

// core

// Here we are declaring empty variables that we'll assign our imported values from `play` later on
// Empty songToPlay variable to store the given URL imported from `play`
let songToPlay = null;

// Empty songIsPlaying variable to initialize the status. `play` assigns 1 to this variable to indicate that a song is playing
let songIsPlaying = false;

// We could implement data retrieval for YouTube videos in this module since we imported the URL from the `play` command here.
// A possible solution would be scraping the duration with Puppeteer and then assigning the value of the scraped time to songTimeSeconds
// For the sake of this demo, we hardcode songTimeSeconds to be 5 seconds for quick testing

// We assign value 5 for songTimeSeconds; 5 seconds
let songTimeSeconds = 5;

// Now, here is where the exportation happens for streamHandler to retrieve the song's data to process it and perform output
module.exports = {

	// setSong method with `song` parameter to hold our URL to play
	setSong(song) {

		// We assign the initialized songToPlay the value of / within the parameter
		songToPlay = song;
	},
	getSong() {

		// Returns the value stored; we can use getSong() in streamHandler to retrieve the URL and process it
		return songToPlay;
	},

	// The below implementations do the exact same as above;
	// Just follow  the method names as they're pretty self explanatory

	// playing status, 1 or 0
	setSongStatus(status) {
		songIsPlaying = status;
	},
	getSongStatus() {
		return songIsPlaying;
	},
	// duration of the song in seconds
	setSongTime(seconds) {
		songTimeSeconds = seconds;
	},
	getSongTime() {
		return songTimeSeconds;
	},
};
