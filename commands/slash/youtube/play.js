const { SlashCommandBuilder } = require('discord.js');
const { launchBrowser, openUrl } = require('../../../handlers/puppeteerHandler');
const { isValidYouTubeUrl, extractVideoId } = require('./modules/youtubeValidator');
const chalk = require('chalk').default;

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Opens a YouTube video in your browser.')
		.addStringOption(option =>
			option.setName('url')
				.setDescription('The YouTube video URL')
				.setRequired(true)),
	async execute(interaction) {
		if (!interaction.isChatInputCommand()) return;

		if (interaction.client.isBotSleeping) {
			console.log(chalk.cyan('[slsh_cmd]: [play.js] Bot is in sleep mode. Ignoring command.'));
			return interaction.reply({ content: 'The bot is in sleep mode and cannot execute commands.', flags: 64 });
		}

		const startTime = Date.now();
		const url = interaction.options.getString('url');
		console.log(chalk.cyan('[slsh_cmd]: [play.js] Opening the YouTube video:', url));

		if (!isValidYouTubeUrl(url)) {
			return interaction.reply({ content: 'Please provide a valid YouTube video URL.', flags: 64 });
		}

		const videoId = extractVideoId(url);

		try {
			await interaction.deferReply({ flags: 64 });

			await launchBrowser();
			await openUrl(`https://www.youtube.com/watch?v=${videoId}`);
			console.log(chalk.cyan(`[slsh_cmd]: [play.js] Opened the YouTube video: ${url}`));

			await interaction.followUp({
				content: `Opened the YouTube video: ${url}`,
				flags: 64,
			});
		}
		catch (error) {
			console.error(chalk.magenta('[slsh_cmd]: [play.js ERROR] An error occurred:', error));
			await interaction.followUp({ content: 'There was an error opening the video.', flags: 64 });
		}

		const endTime = Date.now();
		const executionTime = (endTime - startTime) / 1000;
		console.log(chalk.cyan(`[slsh_cmd]: [play.js] Command execution time: ${executionTime} seconds`));
	},
};