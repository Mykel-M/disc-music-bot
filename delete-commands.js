require('dotenv').config();

const { REST, Routes } = require('discord.js');
const chalk = require('chalk').default;

// Import event handler for command deletion process
const commandDeletionHandler = require('./handlers/commandDeletionHandler');
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.BOT_TOKEN;

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		const startTime = Date.now();
		console.log(chalk.green('[node]: [delete-commands.js] Starting command deletion process...'));

		// Trigger event for starting command deletion
		await commandDeletionHandler.execute('start', {});

		// Fetching guild commands
		const guildCommandsStartTime = Date.now();
		console.log(chalk.green('[node]: [delete-commands.js] Fetching guild commands...'));
		const guildCommands = await rest.get(Routes.applicationGuildCommands(clientId, guildId));
		const guildCommandCount = guildCommands.length;
		console.log(chalk.green(`[node]: [delete-commands.js] Found ${guildCommandCount} guild commands.`));

		// Trigger event for guild command fetching
		await commandDeletionHandler.execute('guildCommandsFetched', { guildCommandCount });

		if (guildCommandCount > 0) {
			console.log(chalk.green('[node]: [delete-commands.js] Deleting all guild commands...'));
			await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] });
			console.log(chalk.green(`[node]: [delete-commands.js] Successfully deleted ${guildCommandCount} guild commands.`));

			// Trigger event for guild command deletion
			await commandDeletionHandler.execute('guildCommandsDeleted', { guildCommandCount });
		}
		else {
			console.log(chalk.yellow('[node]: [delete-commands.js] No guild commands to delete.'));
		}
		const guildCommandsEndTime = Date.now();
		const guildCommandsTime = (guildCommandsEndTime - guildCommandsStartTime) / 1000;
		console.log(chalk.cyan(`[node]: [delete-commands.js] Guild commands fetch and deletion time: ${guildCommandsTime} seconds`));

		// Fetching global commands
		const globalCommandsStartTime = Date.now();
		console.log(chalk.green('[node]: [delete-commands.js] Fetching global commands...'));
		const globalCommands = await rest.get(Routes.applicationCommands(clientId));
		const globalCommandCount = globalCommands.length;
		console.log(chalk.green(`[node]: [delete-commands.js] Found ${globalCommandCount} global commands.`));

		// Trigger event for global command fetching
		await commandDeletionHandler.execute('globalCommandsFetched', { globalCommandCount });

		if (globalCommandCount > 0) {
			console.log(chalk.green('[node]: [delete-commands.js] Deleting all global commands...'));
			await rest.put(Routes.applicationCommands(clientId), { body: [] });
			console.log(chalk.green(`[node]: [delete-commands.js] Successfully deleted ${globalCommandCount} global commands.`));

			// Trigger event for global command deletion
			await commandDeletionHandler.execute('globalCommandsDeleted', { globalCommandCount });
		}
		else {
			console.log(chalk.yellow('[node]: [delete-commands.js] No global commands to delete.'));
		}
		const globalCommandsEndTime = Date.now();
		const globalCommandsTime = (globalCommandsEndTime - globalCommandsStartTime) / 1000;
		console.log(chalk.cyan(`[node]: [delete-commands.js] Global commands fetch and deletion time: ${globalCommandsTime} seconds`));

		// Log total time for the command deletion process
		const endTime = Date.now();
		const totalTime = (endTime - startTime) / 1000;
		console.log(chalk.cyan(`[node]: [delete-commands.js] Total command deletion time: ${totalTime} seconds`));

		// Trigger event for command deletion completion
		await commandDeletionHandler.execute('complete', {});

	}
	catch (error) {
		console.error(chalk.red('[node]: [delete-commands.js ERROR] Error deleting commands:', error));
	}
})();
