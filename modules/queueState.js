// queueState.js

// core
// Array to hold the queue of songs
let queueURLs = [];

// Initializing the status of the queue
let queueIsActive = false;

module.exports = {

	// setQueue method with a 'queue' parameter that will hold our array
	setQueue(queue) {

		// Store the entire array of URLs in the 'queue' parameter
		queueURLs = queue;
	},
	// Get Queue method to return the the array
	getQueue() {

		// Return the current queue array where needed
		return queueURLs;
	},

	// setQueueStatus method with a 'status' parameter that will hold our boolean
	setQueueStatus(status) {
		queueIsActive = status;
	},

	// getQueueStatus methosd to return the status of the queue where needed
	getQueueStatus() {
		return queueIsActive;
	},
};
