require('dotenv').config();
const { Client, GatewayIntentBits, Collection, Events, REST, Routes } = require('discord.js');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk').default;

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
});

client.isBotSleeping = false;

// Capture the start time for overall bot startup
const startTime = Date.now();

const loadCommands = (dir, collection) => {
	if (!fs.existsSync(dir)) {
		console.log(chalk.yellow(`[node]: [index.js] Directory ${dir} does not exist. Skipping.`));
		return;
	}

	const files = fs.readdirSync(dir);
	console.log(chalk.green(`[node]: [index.js] Files in directory ${dir}:`, files));

	files.forEach((file) => {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory() && file.startsWith('modules')) {
			console.log(chalk.green(`[node]: [index.js] Skipping directory ${filePath} (it's a module folder).`));
			return;
		}

		if (stat.isDirectory()) {
			console.log(chalk.green(`[node]: [index.js] Entering subdirectory: ${filePath}`));
			loadCommands(filePath, collection);
		}
		else if (file.endsWith('.js')) {
			console.log(chalk.green(`[node]: [index.js] Processing file: ${filePath}`));

			try {
				const command = require(filePath);
				if ('name' in command && 'execute' in command) {
					collection.set(command.name, command);
					console.log(chalk.green(`[node]: [index.js] Loaded prefix command: ${command.name}`));
				}
				else if ('data' in command && 'execute' in command) {
					collection.set(command.data.name, command);
					console.log(chalk.green(`[node]: [index.js] Loaded slash command: ${command.data.name}`));
				}
				else {
					console.log(chalk.red(`[node]: [index.js WARNING] The command at ${filePath} is missing required "name" or "data" / "execute" properties.`));
				}
			}
			catch (error) {
				console.error(chalk.red(`[node]: [index.js ERROR] Error loading command at ${filePath}:`, error));
			}
		}
	});
};

client.prefixCommands = new Collection();
const prefixCommandsPath = path.join(__dirname, 'commands', 'prefix');
console.log(chalk.green(`[node]: [index.js] Starting to load prefix commands from path: ${prefixCommandsPath}`));
loadCommands(prefixCommandsPath, client.prefixCommands);

client.slashCommands = new Collection();
const slashCommandsPath = path.join(__dirname, 'commands', 'slash');
console.log(chalk.green(`[node]: [index.js] Starting to load slash commands from path: ${slashCommandsPath}`));
loadCommands(slashCommandsPath, client.slashCommands);

console.log(chalk.green('[node]: --- Loaded Prefix Commands ---'));
client.prefixCommands.forEach((command) => {
	console.log(chalk.green(`[node]: [index.js] Loaded prefix command: ${command.name}`));
});

console.log(chalk.green('[node]: --- Loaded Slash Commands ---'));
client.slashCommands.forEach((command) => {
	console.log(chalk.green(`[node]: [index.js] Loaded slash command: ${command.data.name}`));
});

// Capture the start time for command registration
const registerCommandsStartTime = Date.now();

const registerSlashCommands = async () => {
	const commands = client.slashCommands.map(command => command.data.toJSON());

	try {
		const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

		console.log(chalk.green(`[node]: [index.js] Registering ${commands.length} slash commands.`));

		// Register commands globally
		await rest.put(
			Routes.applicationGuildCommands(client.user.id, process.env.GUILD_ID),
			{ body: commands },
		);

		console.log(chalk.green(`[node]: [index.js] Slash commands registered for guild. Total commands: ${commands.length}`));

	}
	catch (error) {
		console.error(chalk.red('[node]: [index.js ERROR] Error registering slash commands:', error));
	}

	// Log the time it took to register commands
	const registerCommandsEndTime = Date.now();
	const commandRegistrationTime = (registerCommandsEndTime - registerCommandsStartTime) / 1000;
	console.log(chalk.cyan(`[node]: [index.js] Command registration time: ${commandRegistrationTime} seconds`));
};

// Loading and registering event handlers dynamically
const loadHandlers = (dir) => {
	const files = fs.readdirSync(dir);
	files.forEach((file) => {
		const filePath = path.join(dir, file);
		const stat = fs.statSync(filePath);

		if (stat.isDirectory()) {
			loadHandlers(filePath);
		}
		else if (file.endsWith('.js')) {
			try {
				const handler = require(filePath);
				if (handler.name && handler.execute) {
					// Pass both interaction and client to the handler
					client.on(handler.name, (...args) => handler.execute(...args, client));
					console.log(chalk.green(`[node]: Loaded event handler for event: ${handler.name}`));
				}
			}
			catch (error) {
				console.error(chalk.red(`[ERROR] Error loading event handler at ${filePath}:`, error));
			}
		}
	});
};

// Start loading event handlers
loadHandlers(path.join(__dirname, 'handlers'));

// Logging in the bot
client.once(Events.ClientReady, () => {
	registerSlashCommands();
	console.log(chalk.green(`[node]: [index.js] Logged in as ${client.user.tag}!`));

	// Log the time it took for the bot to start
	const endTime = Date.now();
	const startupTime = (endTime - startTime) / 1000;
	console.log(chalk.cyan(`[node]: [index.js] Bot startup time: ${startupTime} seconds`));
});

client.login(process.env.BOT_TOKEN);