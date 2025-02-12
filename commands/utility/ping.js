// ping.js
// Discord.js guide code

// chores
const { SlashCommandBuilder } = require('discord.js');

// core
module.exports = {
	cooldown: 5,
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Pings the bot for a reply'),
	async execute(interaction) {
		console.log('Executing ping command...');
		await interaction.reply({ content: 'I am online.', flags: 64 });
		console.log('Ping reply sent...');
	},
};