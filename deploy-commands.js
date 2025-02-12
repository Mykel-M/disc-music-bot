// deploy-commands.js
// Discord.js guide code
// Slightly tweaked to show more useful

// chores
console.log('Command deployment started...');
const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');
const fs = require('fs');
const path = require('path');

const commands = [];
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// core
// More dynamic folder searching to find commands
console.log('Searching for commands...');
for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	console.log(`Commands being deployed: ${commandFiles}`);
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		}
		else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

// InitialiZe discord REST API
const rest = new REST().setToken(token);

// Perform asynchrnous function; invoke immediately (=>)
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// Put the new data of the commands it finds into the Guild as Guild commands
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),

			// the body; code
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	}
	catch (error) {
		console.error(error);
	}
})();