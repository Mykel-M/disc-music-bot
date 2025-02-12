// queue.js

// Summary:
// Our `queue` slash command should prompt the user for a URL that gets validated, and then the given URL gets passed into the first element of the queueURLs array.
// It can do this up to a maximum of 5 times and then it exports the values of the array to streamHandler to process.
// This command can handle itself, since we can just use the array we're manipulating to define our limitations and then just export the array where its needed.

// chores
const { SlashCommandBuilder } = require('discord.js');
const queueState = require('../../modules/queueState');

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
		// With each successful interaction, the array length naturally increases. We can then use that length to implement our condition.
		// This condition will limit the execution of the queue command, up to a maximum of 5 times
		// The value of the literal is the fixed threshold that controls the limitation: i.e 5, 10, or 15 etc. max queue entries
		const queueURLs = queueState.getQueue();

		// Defining the condition that this interaction can only be executed for a maximum of 5 times
		// set to any number you like to increase max queue elements
		if (queueURLs.length < 5) {
			console.log('Executing queue command...');

			// Here we store the value of the String option to constant variable `url`
			const songToQueue = interaction.options.getString('queuesong');

			// Regular expression (RegEx) created by ChatGPT to validate youtube URLS i.e) uploaded videos only
			const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/(watch\?v=|embed\/|v\/|.+\/videos\/|.+\/playlist\?list=|.+\/channel\/)([\w-]+)$/;

			// Here we perform the `test` method first (before pushing the URL to the array) in order to validate the given URL so that we don't push garbage.
			// It checks that the URL matches the pattern of the RegEx
			// If the the (url) does not [!] pass the RegEx test, a reply to the user is sent to inform them the URL is invalid
			if (!youtubeRegex.test(songToQueue)) {
				console.log('Invalid URL');
				return interaction.reply({ content: 'Invalid YouTube video URL!', flags: 64 });
			}

			// Pushing the new URL to the array. Array length increases
			queueURLs.push(songToQueue);

			// Store the song URL globally
			queueState.setQueue(queueURLs);

			// We use boolean here to set a global status of our queue system; whether active or inactive (true or false respectively)
			queueState.setQueueStatus(true);

			// Response to the user
			await interaction.reply({ content: `Queuing song: ${songToQueue}`, flags: 64 });

			// Printing to console the URLs within the array
			console.log(`Queue: ${queueURLs}`);
		}

		// else return feedback -> invalid
		else {
			interaction.reply({ content: 'Queue max reached...', flags: 64 });
			console.log('Queue max reached...');
		}
	},
};