const chalk = require('chalk').default;

module.exports = {
	name: 'sleep',
	description: 'Puts the bot in sleep mode to save resources.',
	async execute(message, args, client) {
		try {
			if (client.isBotSleeping) {
				console.log(chalk.cyan('[pf_cmd]: [sleep.js] Bot is already in sleep mode.'));
				return message.reply('The bot is already in sleep mode.');
			}

			client.isBotSleeping = true;
			console.log(chalk.cyan('[pf_cmd]: [sleep.js] Bot is now in sleep mode.'));
			await message.reply('The bot is now in sleep mode. It will ignore commands to save resources.');
		}
		catch (error) {
			console.error(chalk.magenta('[pf_cmd]: [sleep.js ERROR] Error while setting bot to sleep mode:', error));
			await message.reply('There was an error putting the bot in sleep mode.');
		}
	},
};
