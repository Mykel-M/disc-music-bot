const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk').default;
require('dotenv').config();

// Event handler to handle command deployment logic
const commandDeploymentHandler = require('./handlers/commandDeploymentHandler');

const commands = [];
const commandNames = [];

// Initialize the client
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.login(process.env.BOT_TOKEN);

const loadCommands = (dir) => {
	if (!fs.existsSync(dir)) {
		console.log(chalk.yellow(`[node]: [deploy-commands.js] Directory ${dir} does not exist. Skipping.`));
		return;
	}

	const files = fs.readdirSync(dir);
	console.log(chalk.green(`[node]: [deploy-commands.js] Files in directory ${dir}:`, files));

	files.forEach((file) => {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			// Recursively search through all directories, except 'modules'
			if (file.startsWith('modules')) {
				console.log(chalk.green(`[node]: [deploy-commands.js] Skipping directory ${filePath} (it's a module folder).`));
			}
			else {
				console.log(chalk.green(`[node]: [deploy-commands.js] Entering subdirectory: ${filePath}`));
				loadCommands(filePath);
			}
			return;
		}

		if (file.endsWith('.js')) {
			console.log(chalk.green(`[node]: [deploy-commands.js] Processing file: ${filePath}`));

			try {
				const command = require(filePath);
				if ('data' in command && 'execute' in command) {
					commands.push(command.data.toJSON());
					commandNames.push(command.data.name);
					console.log(chalk.green(`[node]: [deploy-commands.js] Loaded command: ${command.data.name}`));
				}
				else {
					console.log(chalk.yellow(`[node]: [deploy-commands.js WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`));
				}
			}
			catch (error) {
				console.error(chalk.red(`[node]: [deploy-commands.js ERROR] Error loading command at ${filePath}:`, error));
			}
		}
	});
};

// Capture start time for command loading
const loadCommandsStartTime = Date.now();

const slashCommandsPath = path.join(__dirname, 'commands', 'slash');
console.log(chalk.green(`[node]: [deploy-commands.js] Starting to load commands from path: ${slashCommandsPath}`));
loadCommands(slashCommandsPath);

// Log the time it took to load commands
const loadCommandsEndTime = Date.now();
const loadCommandsTime = (loadCommandsEndTime - loadCommandsStartTime) / 1000;
console.log(chalk.cyan(`[node]: [deploy-commands.js] Command loading time: ${loadCommandsTime} seconds`));

console.log(chalk.green(`[node]: [deploy-commands.js] Successfully loaded ${commands.length} slash commands: ${commandNames.join(', ')}`));

console.log(chalk.green(`[node]: [deploy-commands.js] CLIENT_ID: ${process.env.CLIENT_ID}`));
console.log(chalk.green(`[node]: [deploy-commands.js] GUILD_ID: ${process.env.GUILD_ID}`));

const rest = new REST().setToken(process.env.BOT_TOKEN);

// Capture start time for command deployment
const deployCommandsStartTime = Date.now();

(async () => {
	try {
		console.log(chalk.green(`[node]: [deploy-commands.js] Started refreshing ${commands.length} application (/) commands.`));

		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
			{ body: commands },
		);

		// Log the time it took to deploy commands
		const deployCommandsEndTime = Date.now();
		const deployCommandsTime = (deployCommandsEndTime - deployCommandsStartTime) / 1000;
		console.log(chalk.cyan(`[node]: [deploy-commands.js] Command deployment time: ${deployCommandsTime} seconds`));

		console.log(chalk.green(`[node]: [deploy-commands.js] Successfully reloaded ${data.length} application (/) commands.`));
		console.log(chalk.green('[node]: [deploy-commands.js] Command deployment complete.'));

		// Trigger event handler for post-deployment actions
		commandDeploymentHandler.execute(client, data);

		// Gracefully exit the process
		process.exit(0);
	}
	catch (error) {
		console.error(chalk.red('[node]: [deploy-commands.js ERROR] Error deploying commands:', error));
		process.exit(1);
	}
})();
