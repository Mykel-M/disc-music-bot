// ready.js
// Discord.js guide code

// chores
const { Events } = require('discord.js');

// core
module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Logged in as ${client.user.tag}`);
	},
};