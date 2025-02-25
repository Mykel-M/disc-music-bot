// chores
const { SlashCommandBuilder } = require('discord.js');
const queueState = require('../../modules/queueState');
const { playSongHandler } = require('../../modules/streamHandler');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('queue')
		.setDescription('Queues the given song')
		.addStringOption(option =>
			option.setName('queuesong')
				.setDescription('Song to queue')
				.setRequired(true),
		),

	// core
	async execute(interaction) {
		const queueURLs = queueState.getQueue();

		// Limit the queue to 5 songs
		if (queueURLs.length < 5) {
			console.log('Executing queue command...');

			// Get the song URL from the user input
			const songToQueue = interaction.options.getString('queuesong');

			// YouTube URL validation regex
			const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/(watch\?v=|embed\/|v\/|.+\/videos\/|.+\/playlist\?list=|.+\/channel\/)([\w-]+)$/;

			// Validate the URL
			if (!youtubeRegex.test(songToQueue)) {
				console.log('Invalid URL');
				return interaction.reply({ content: 'Invalid YouTube video URL!', flags: 64 });
			}

			// Add the URL to the queue
			queueURLs.push(songToQueue);

			// Store the updated queue in the global state
			queueState.setQueue(queueURLs);

			// Set the queue status to active
			queueState.setQueueStatus(true);

			// Send feedback to the user
			await interaction.reply({ content: `Queuing song: ${songToQueue}`, flags: 64 });

			// Print the current queue to the console
			console.log(`Queue: ${queueURLs}`);

			// If the queue has songs, process them
			if (queueURLs.length === 1) {

				// Start the first song in the queue
				playSongHandler(interaction);
			}
		}
		else {
			// If the queue is full, inform the user
			interaction.reply({ content: 'Queue max reached...', flags: 64 });
			console.log('Queue max reached...');
		}
	},
};
