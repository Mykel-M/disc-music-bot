const chalk = require('chalk').default;

module.exports = {
	name: 'ping',
	description: 'Pings the bot.',
	async execute(message, args, client) {
		const startTime = Date.now();
		console.log(chalk.cyan('[pf_cmd]: [ping.js] "ping" command received.'));

		// Check if the bot is asleep
		if (client.isBotSleeping) {
			console.log(chalk.cyan('[pf_cmd]: [ping.js] Bot is in sleep mode. Ignoring command.'));
			return message.reply('The bot is in sleep mode and is ignoring commands.');
		}

		const latency = Date.now() - message.createdTimestamp;
		console.log(chalk.cyan(`[pf_cmd]: [ping.js] Latency calculated: ${latency}ms`));

		try {
			const responseContent = 'I think, therefore I am.';
			console.log(chalk.cyan(`[pf_cmd]: [ping.js] Preparing to send reply: ${responseContent}`));

			await message.reply(responseContent);
			console.log(chalk.cyan('[pf_cmd]: [ping.js] Reply sent successfully.'));
		}
		catch (error) {
			console.error(chalk.magenta('[pf_cmd]: [ping.js ERROR] An error occurred while sending the reply:', error));
			await message.reply('There was an error processing your ping command.');
			console.error(chalk.magenta('[pf_cmd]: [ping.js] Error response sent.'));
		}

		const endTime = Date.now();
		const executionTime = (endTime - startTime) / 1000;
		console.log(chalk.cyan(`[pf_cmd]: [ping.js] Command execution time: ${executionTime} seconds`));
	},
};
