// chores
const queueState = require('./queueState');
const songState = require('./songState');

// core
let queueArray = [];

async function playSongHandler(interaction) {
	if (songState.getSongStatus()) {
		// Log the song and its duration in seconds
		console.log('Playing song:', songState.getSong());
		console.log('Song duration:', songState.getSongTime(), 'seconds');

		// If the interaction hasn't been replied to, use reply; otherwise, use followUp
		if (!interaction.replied) {
			await interaction.reply({ content: `Now playing: ${songState.getSong()}`, flags: 64 });
		}
		else {
			await interaction.followUp({ content: `Now playing: ${songState.getSong()}`, flags: 64 });
		}

		// Set a timeout for the duration of the song (in milliseconds)
		setTimeout(async () => {
			console.log('Song finished');

			// Mark the song as finished
			songState.setSongStatus(false);

			// After song finishes, check if there are queued songs
			await queueSongSearch(interaction);
		}, songState.getSongTime() * 1000);
	}
	else if (!interaction.replied) {
		await interaction.reply({ content: 'There is no song currently playing.', flags: 64 });
	}
	else {
		await interaction.followUp({ content: 'There is no song currently playing.', flags: 64 });
	}
}

async function queueSongSearch(interaction) {
	if (queueState.getQueueStatus()) {
		console.log('Queued songs:', queueState.getQueue());
		await queueLoadIntoSongState(interaction);
	}
	else {
		console.log('Queue is inactive');
		if (!interaction.replied) {
			await interaction.reply({ content: 'Queue is inactive. Please add a song to the queue!', flags: 64 });
		}
		else {
			await interaction.followUp({ content: 'Queue is inactive. Please add a song to the queue!', flags: 64 });
		}
	}
}

async function queueLoadIntoSongState(interaction) {
	// Retrieve the current queue
	queueArray = queueState.getQueue();

	if (queueArray.length > 0) {
		// Load the next song into the song state
		songState.setSong(queueArray[0]);
		songState.setSongStatus(true);

		// Remove the song that is now playing from the queue
		queueArray.shift();
		queueState.setQueue(queueArray);

		console.log('Next song in the queue:', songState.getSong());

		if (!interaction.replied) {
			await interaction.reply({ content: 'Now playing next song...', flags: 64 });
		}
		else {
			await interaction.followUp({ content: 'Now playing next song...', flags: 64 });
		}

		// Start playing the next song
		await playSongHandler(interaction);
	}
	else {
		console.log('Queue is empty');
		if (!interaction.replied) {
			await interaction.reply({ content: 'The queue is empty. No more songs to play.', flags: 64 });
		}
		else {
			await interaction.followUp({ content: 'The queue is empty. No more songs to play.', flags: 64 });
		}
	}
}

module.exports = {
	playSongHandler,
};
