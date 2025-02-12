// interactionCreate.js
// Discord.js guide code

// HIn this module, we handle interaction events when needed

// chores
const { Events, MessageFlags } = require('discord.js');

// core
// create a module that can be exported
module.exports = {
	// name of the event
	name: Events.InteractionCreate,

	// perform aynsc function; no immediate invoking
	async execute(interaction) {
		console.log('Interaction triggered...');

		// Check if the interaction is not [!] a ChatinputCommand
		if (!interaction.isChatInputCommand()) return;

		// Here we declare command and assign it to the command object of the interaction triggered by the user
		const command = interaction.client.commands.get(interaction.commandName);

		// Check if the command exists
		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		// Execute the interaction
		try {
			await command.execute(interaction);

			// Error checking
		}
		catch (error) {
			console.error(error);
			if (interaction.replied || interaction.deferred) {
				await interaction.followUp({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
			}
			else {
				await interaction.reply({ content: 'There was an error while executing this command!', flags: MessageFlags.Ephemeral });
			}
		}
	},
};