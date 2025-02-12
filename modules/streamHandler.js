// streamHandler.js

// chores
const queueState = require('./queueState');
const songState = require('./songState');

// core
// We initialize an array to store the queue array that we will retrieve from our queueState
let queueArray = [];


// Our playSongHandler that retrieves the URL and its duration and then processes the stream
// In this function we could just call another method from another module that processes the stream, then we just have that method call a timer function
// For now, we just use logs to indicate that the values are being retrieved successfully
function playSongHandler() {

	// if the songState is set to True (active)
	if (songState.getSongStatus()) {

		// feedback; show URL
		console.log('Playing song: ', songState.getSong());

		// feedback; show duration
		console.log('Song duration: ', songState.getSongTime());

		//
		// Stream output; we can call a local function on this line or an exported one to actually play the song and connect the bot etc..
		//

		// timeout function created by ChatGPT to process our queue after the song is finished
		setTimeout(() => {

			// This will run after 5 seconds
			console.log('Song finished');
			songState.setSongStatus(false);

			// Call queueSongSearch() to see if any songs are in the queue now that the song is finished
			queueSongSearch();

			// Convert seconds to milliseconds as required by setTimeout
		}, songState.getSongTime() * 1000);
	}
	else {
		console.log('Invalid');
	}
}

// Here we want to check if there's anything in the queue and then load the queue into the Song State
// This only gets activated after a song is ended
function queueSongSearch() {

	// Check if the queue is active
	if (queueState.getQueueStatus()) {

		// output to console what's in the queue
		console.log('Queued songs: ', queueState.getQueue());

		// Call the queueLoadIntoSongState to process the queued songs into the songState
		queueLoadIntoSongState();
	}
	else {
		console.log('Queue is inactive');
	}
}
// Function to load the queued songs into the songState to be played
function queueLoadIntoSongState() {

		 // Store the values (URLs) in our getQueue(array) from the queueState into a local queueArray variable
	queueArray = queueState.getQueue();

	// Here we check if the length of the array is above 0 so this process initiates if there are still songs in the queue; keeps the loop going
	if (queueArray.length > 0) {

		// We set the value of setSong(string) to the value of the first element in queueArray; load the 1st queued URL into the songState
		songState.setSong(queueArray[0]);

		 // We set setSongStatus to true so our playSongHandler will play the song; ensuring that we pass the condition for songs to play
		songState.setSongStatus(true);

		 // We remove the first element of the queueArray
		 // Removing the song we just played i.e ) shift the second element to first, effectivelty removing the first initial element
		queueArray.shift();

		 // Then we update the queueState setQueue array so the arrays move to the left
		queueState.setQueue(queueArray);

		 // Now we call playSongHandler() to play our song; functional loop begins again
		playSongHandler();
	}

		 // Once the length of queueArray is 0, we tell the console that the queue is empty
		 // Functional loopp effectively stops
	else if (queueArray.length === 0) {
		console.log('Queue empty');
	}
}

// Here we export our playSongHandler and queueSongSearch functions so that `play` and `queue`
module.exports = {
	playSongHandler,
};
