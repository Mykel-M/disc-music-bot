const chalk = require('chalk').default;

module.exports = {
	name: 'interactionCreate',
	async execute(interaction, client) {
		// Define the blue-green color using Chalk
		const blueGreen = chalk.hex('#00CED1');

		// Check if the interaction is a command (for Discord.js v14+)
		if (!interaction.isChatInputCommand()) {
			console.log(blueGreen('[hndlr]: [interactionCreate.js WARNING] This is not a command interaction.'));
			return;
		}

		// Log that we received a valid command interaction
		console.log(blueGreen('Received a command interaction.'));

		// Check if bot is sleeping
		if (client.isBotSleeping) {
			console.log(blueGreen('[hndlr]: [interactionCreate.js]: Bot is in sleep mode. Ignoring command.'));
			return interaction.reply({
				content: 'The bot is in sleep mode and is ignoring commands.',
				flags: 64,
			});
		}

		// Retrieve the command handler from the commands collection
		const command = client.slashCommands.get(interaction.commandName);

		// If the command doesn't exist, log an error and return
		if (!command) {
			console.error(blueGreen(`[hndlr]: [interactionCreate.js ERROR] Command not found: ${interaction.commandName}`));
			return interaction.reply({
				content: 'This command is not recognized.',
				flags: 64,
			});
		}

		// Log the command that was received and about to be executed
		console.log(blueGreen(`[hndlr]: [interactionCreate.js]: Executing command: ${interaction.commandName}`));

		try {
			// Try to execute the command
			await command.execute(interaction);
		}
		catch (error) {
			// Log the error if there's any issue executing the command
			console.error(blueGreen('[hndlr]: [interactionCreate.js ERROR] Error executing command:', error));

			// Handle the error by replying to the interaction with an error message
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({
					content: 'There was an error executing that command!',
					flags: 64,
				});
			}
			else {
				await interaction.reply({
					content: 'There was an error executing that command!',
					flags: 64,
				});
			}
		}
	},
};