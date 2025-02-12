# klooger-bot

## klooger-bot-v0.0.1-pre-alpha (LATEST)

![Repo](https://img.shields.io/static/v1?label=repository&message=disc-music-bot&color=blue)
[![Main Branch](https://img.shields.io/static/v1?label=main&message=master&color=blue)](https://github.com/Mykel-M/disc-music-bot/tree/master)

![Branch](https://img.shields.io/badge/branch-klooger-5CACEE)
![Pre-Alpha](https://img.shields.io/badge/status-pre--alpha-red)

![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple.svg)](https://github.com/Mykel-M/disc-music-bot/blob/klooger-bot/LICENSE)



## Overview

`klooger-bot` is a basic Discord bot designed for testing purposes. It demonstrates simple functionality, including interaction with the Discord API and Puppeteer for managing YouTube URLs.

## Requirements

- Node.js v16.9.0 or newer  
- A Discord bot token from the [Discord Developer Portal](https://discord.com/developers/applications)  
- A Discord bot client ID (application ID) from the [Discord Developer Portal](https://discord.com/developers/applications)  
- A guild ID from your Discord server  

## Setup

1. Add your Discord bot token, client ID, and guild ID to `.env` (environment variables).  
2. Install dependencies:  
   ```sh
   npm install
   ```  
3. Start the bot:  
   ```sh
   node index.js
   ```

### Example `.env` File:

```env
BOT_TOKEN=your-bot-token
CLIENT_ID=your-client-id
GUILD_ID=your-guild-id
CHANNEL_ID=your-channel-id-for-purge-script
```

## Project Structure

The `klooger-bot_v0.0.1-pre-alpha` project directory is optimized for a fast and functional development environment. For a modular and layered directory structure, consider the [JavaScript Directory Structures](https://gist.github.com/tracker1/59f2c13044315f88bee9) recommendation by tracker1.

### Node.js Module Resolution

The Node.js module resolution algorithm requires that the `node_modules` directory is located at the root of the project. If you want to place `node_modules` in a subdirectory (such as `build`), you'll need to adapt the project accordingly.

For more details, refer to the official Node.js documentation: [Node.js Modules](https://nodejs.org/api/modules.html#loading-from-node_modules-folders).

If you don't have Node.js installed, you can download it from the official website: [Download Node.js](https://nodejs.org/).

## Nodes

This project contains four nodes:

1. **index.js** - Initializes the bot and registers all commands. 
2. **deploy-commands.js** - Deploys all slash commands to the Discord server.  
3. **delete-commands.js** - Deletes all previously registered global and guild commands from the Discord server.
4. **purge.js** - Deletes all messages within a given channel. Add the Channel ID you wish to purge in the `.env` (enviroment variables) file.

## Commands

### Prefix Commands (`!`)

This bot supports three prefix-based commands:

1. `!ping` - Responds with a reply message to confirm connectivity.  
2. `!sleep` - Puts the bot into sleep mode and stops responding to commands.  
3. `!wake` - Wakes the bot up and resumes command responsiveness.  

### Slash Commands (`/`)

This bot currently has one slash command:

1. `/play <YouTube URL>` - Loads the YouTube video URL into an internal browser using Puppeteer in stealth mode This does not stream the video to a voice channel or play it internally. Example usage:  
   ```/play https://www.youtube.com/watch?v=dQw4w9WgXcQ``` 

**Note:** All slash commands are registered as guild commands. We use guild commands because they update instantly—making them ideal for rapid development and testing. Global commands can take up to an hour to propagate changes, so using guild commands allows us to iterate quickly in a controlled server environment.

## Troubleshooting

- If the bot does not start, ensure you have correctly added the required tokens to your `.env` file.  
- Read the console.

## Contributing

Feel free to fork this project, make improvements, and submit a pull request.  

## Future Improvements

- Add audio-video streaming.
- Add more useful commands.
- Add more useful nodes.
- Create Java GUI program to tweak bot settings and preferences
- Integrate UI for end-user.
- Improve error handling and logging.
- Extensive bug tests

## Contact

For any issues or questions, feel free to open an issue on the GitHub repository branch: https://github.com/Mykel-M/disc-music-bot/tree/klooger-bot

## Documentation

- [klooger-bot Docs] (Work-In-Progress)
- [Node.js Docs](https://nodejs.org/docs/latest/api/)  
- [Discord.js Docs](https://discord.js.org/docs/packages/discord.js/14.17.3)  

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
