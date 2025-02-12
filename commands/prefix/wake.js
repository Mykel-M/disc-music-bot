const chalk = require('chalk').default;

module.exports = {
	name: 'wake',
	description: 'Wakes up the bot from sleep mode.',
	async execute(message, args, client) {
		const startTime = Date.now();
		console.log(chalk.cyan('[pf_cmd]: [wake.js] Command "wake" received.'));

		try {
			if (!client.isBotSleeping) {
				console.log(chalk.cyan('[pf_cmd]: [wake.js] Bot is already awake.'));
				return message.reply('The bot is already awake.');
			}

			// Set bot to awake
			client.isBotSleeping = false;
			console.log(chalk.cyan('[pf_cmd]: [wake.js] Bot is now awake.'));
			const responseContent = 'Rest isn\'t a reward for work; it\'s part of the work.';
			console.log(chalk.cyan(`[pf_cmd]: [wake.js] Responding with message: ${responseContent}`));

			await message.reply(responseContent);
			console.log(chalk.cyan('[pf_cmd]: [wake.js] Reply sent successfully.'));
		}
		catch (error) {
			console.error(chalk.magenta('[pf_cmd]: [wake.js ERROR] An error occurred while replying to the message:', error));
			await message.reply('There was an error waking up the bot.');
			console.error(chalk.magenta('[pf_cmd]: [wake.js] Error response sent.'));
		}

		const endTime = Date.now();
		const executionTime = (endTime - startTime) / 1000;
		console.log(chalk.cyan(`[pf_cmd]: [wake.js] Command execution time: ${executionTime} seconds`));
	},
};
