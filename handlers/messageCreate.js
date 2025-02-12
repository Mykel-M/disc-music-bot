const config = require('../config.json');
const chalk = require('chalk').default;

module.exports = {
	name: 'messageCreate',
	async execute(message, client) {
		// Define the blue-green color using Chalk
		const blueGreen = chalk.hex('#00CED1');

		// Skip the bot's own messages
		if (message.author.bot) return;

		// Get the prefix from the config file
		const prefix = config.prefix;

		// Check if the message starts with the prefix
		if (message.content.startsWith(prefix)) {
			const args = message.content.slice(prefix.length).trim().split(/ +/);
			const commandName = args.shift().toLowerCase();

			// Check if the command exists
			const command = client.prefixCommands.get(commandName);
			if (command) {
				try {
					// Log the command that is about to be executed
					console.log(blueGreen(`[hndlr]: [messageCreate.js] Executing command: ${commandName}`));

					// Execute the command
					await command.execute(message, args, client);
				}
				catch (error) {
					// Log the error if there's any issue executing the command
					console.error(blueGreen(`[hndlr]: [messageCreate.js ERROR] Error executing command: ${commandName}`), error);

					// Optionally reply to the user about the error
					await message.reply('There was an error executing that command!');
				}
			}
			else {
				// Optional: Reply if the command doesn't exist
				await message.reply(`Command \`${commandName}\` not found.`);
			}
		}
	},
};