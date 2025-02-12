// play.js

// chores
const { SlashCommandBuilder } = require('discord.js');
const songState = require('../../modules/songState');
const { playSongHandler } = require('../../modules/streamHandler');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays the given song')
		.addStringOption(option =>
			option.setName('playsong')
				.setDescription('Song to play')
				.setRequired(true),
		),

	// core
	// Functions like the queue command

	// Read stringOption, store in songToPlay
	async execute(interaction) {
		console.log('Executing play command...');
		const songToPlay = interaction.options.getString('playsong');
		// Regex expression for validation
		const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/(watch\?v=|embed\/|v\/|.+\/videos\/|.+\/playlist\?list=|.+\/channel\/)([\w-]+)$/;

		// Check if the string is invalid
		if (!youtubeRegex.test(songToPlay)) {
			console.log('Invalid URL');

			// return a response noting its invalid
			return interaction.reply({ content: 'Invalid YouTube video URL!', flags: 64 });
		}
		// if yes
		// Store the global song in songState to the string (URL)
		songState.setSong(songToPlay);

		// Set the global songStatus to true
		songState.setSongStatus(true);

		// feedback
		await interaction.reply({ content: `Playing song: ${songToPlay}`, flags: 64 });

		// call playSongHandler in streamHandler to play the given song
		playSongHandler();
	},
};
