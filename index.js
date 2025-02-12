// index.js
// Discord.js guide code
// Slightly tweaked for more useful logs

// chores
console.log('Bot initializing...');
const fs = require('fs');
const path = require('path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.commands = new Collection();

// Here we assign the foldersPath to the directory called `commands` in root
const foldersPath = path.join(__dirname, 'commands');
console.log(`Dynamically searching for commands in ${foldersPath} `);
const commandFolders = fs.readdirSync(foldersPath);

// core

// Log added to track the process
console.log('Setting commands now:');

// The dynamic folder searching here is a discord.js guide recommendation; they have you use this in their setup guide.
// The reason we would want to use this is so that we can organize our commands in relevant directories/categories
// Utility commands in /commands/utility, music commands in /commands/music etc..
// We declare folder and assign it the data of commandsPath
// The for loop allows this to be repeated for every new folder it finds

// For every folder in commandFolders; individualization
for (const folder of commandFolders) {
	// Here we declare commandsPath and then we want to assign it the path of the commands subdirectories

	// We merge the paths of foldersPath ('commands') with the path of the folders to get our subdirectories
	const commandsPath = path.join(foldersPath, folder);

	// Here we used readdirSync to perform a synchronous method from nodejs file system (fs) to scan our directories
	// We use readdirSync to block execution until the entire directory is read
	// First we declare the commandFiles and then assign it the data of what the method is reading
	// The method wants to filter all files to retrieve the the list of files thatend with.js
	// We scan the directories for all files that ends with .js and assign the data to commandFiles
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

	// Here we declare variable `file` to use in the for loop
	// And we use of to store the data of commandFiles individually in `file`
	// The loop allows this to repeated for every command that exists
	// It works similarly to the initial for loop for folders
	// For every file of command files do; individualization
	for (const file of commandFiles) {

		// The filePath of those files is the path of the CommandsPath and the files
		const filePath = path.join(commandsPath, file);

		// Then we declare a command variable to require filePath so we can read the code of those commands
		const command = require(filePath);

		// Then we use a condition to check that the 'data' and 'execute' properties in our commands exist
		if ('data' in command && 'execute' in command) {

			// If yes, output the name of the data of commands (name of our command) to console
			console.log(`-${command.data.name}`);

			// then we set the client commands to the name of the command and its code
			client.commands.set(command.data.name, command);
		}
		else {
			// Replies back with error code noting that the commands are missing required properties
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}
// feedback; noting commands were set successfully
console.log('All commands set.');

// feedback
console.log('Getting ready...');

// Dynamic eventHandler searching
// Declare eventspath and assign it the path of the directory named events
const eventsPath = path.join(__dirname, 'events');

// Here we store the data of the events directory in eventsFiles
// perform readdirSync to filter files with .js extension
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

// This is where events get executed
// Here we declare `file` to use in the for loop
// We use of to store the data of eventFiles in file
// Individualization with our for loop
for (const file of eventFiles) {

	// Declare filePath and assign the joined paths of eventsPath and the file (eventFiles)
	const filePath = path.join(eventsPath, file);

	// Declare event and require filePath dynamically executes any files in the filePath
	const event = require(filePath);

	// In this condition we check if the events should run once or more than once
	// if the event is a one time events like ready
	if (event.once) {

		// execute it
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		// events more than once; interactionCreate or messageCreate
		// execute it
		client.on(event.name, (...args) => event.execute(...args));
	}
}

console.log('Logging in...');
client.login(token);