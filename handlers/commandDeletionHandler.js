// handlers/commandDeletionHandler.js

// Import Chalk using .default for CommonJS compatibility
const chalk = require('chalk').default;

module.exports = {
	name: 'commandDeletionHandler',
	async execute(eventType, data) {
		// Define a blue-green color using Chalk
		const blueGreen = chalk.hex('#00CED1');

		switch (eventType) {
		case 'start':
			console.log(blueGreen('[hndlr]: [commandDeletionHandler.js] Command deletion process started.'));
			break;

		case 'guildCommandsFetched':
			console.log(blueGreen(`[hndlr]: [commandDeletionHandler.js] Fetched ${data.guildCommandCount} guild commands.`));
			break;

		case 'guildCommandsDeleted':
			console.log(blueGreen(`[hndlr]: [commandDeletionHandler.js] Deleted ${data.guildCommandCount} guild commands.`));
			break;

		case 'globalCommandsFetched':
			console.log(blueGreen(`[hndlr]: [commandDeletionHandler.js] Fetched ${data.globalCommandCount} global commands.`));
			break;

		case 'globalCommandsDeleted':
			console.log(blueGreen(`[hndlr]: [commandDeletionHandler.js] Deleted ${data.globalCommandCount} global commands.`));
			break;

		case 'complete':
			console.log(blueGreen('[hndlr]: [commandDeletionHandler.js] Command deletion process complete.'));
			break;

		default:
			console.log(blueGreen('[hndlr]: [commandDeletionHandler.js ERROR] Unknown event type.'));
			break;
		}
	},
};