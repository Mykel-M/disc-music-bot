const { Client, GatewayIntentBits, PermissionsBitField } = require('discord.js');
require('dotenv').config();

// Create a new client instance
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// Function to purge messages in a channel
async function purgeChannel(channelId) {
	try {
		// Fetch the channel by ID
		const channel = await client.channels.fetch(channelId);

		// Check if the bot has permission to manage messages in the channel
		if (!channel.permissionsFor(client.user).has(PermissionsBitField.Flags.ManageMessages)) {
			console.log('Bot does not have permission to manage messages in this channel.');
			return;
		}

		// Fetch and delete messages in batches of 100, staying within the 14-day limit
		let messagesFetched = 0;
		let messages;
		do {
			// Fetch the last 100 messages
			messages = await channel.messages.fetch({ limit: 100 });

			// Delete messages in bulk
			if (messages.size > 0) {
				await channel.bulkDelete(messages);
				messagesFetched += messages.size;
				console.log(`Deleted ${messages.size} messages...`);
			}

			// Optional delay to avoid rate limits
			await new Promise(resolve => setTimeout(resolve, 1000));
		} while (messages.size > 0);

		console.log(`Successfully purged ${messagesFetched} messages.`);

		// Shut down the bot after the purge is done
		client.destroy();
		console.log('Bot has been logged out.');
	}
	catch (error) {
		console.error('Error purging messages:', error);
	}
}

// Login with your bot's token and run the purge process
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);

	// Replace 'CHANNEL_ID' with the actual channel ID from your .env file
	const channelId = process.env.CHANNEL_ID;
	purgeChannel(channelId);
});

// Login with your bot's token
client.login(process.env.BOT_TOKEN);
