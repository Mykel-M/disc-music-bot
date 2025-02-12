# WORK-IN-PROGRESS

# klooger-bot-1.0.0-pre-alpha_dev

license: [MIT](https://github.com/Mykel-M/disc-music-bot/blob/klooger-bot/LICENSE)

main: [master](https://github.com/Mykel-M/disc-music-bot/tree/master)

branch: [klooger-bot-dev](https://github.com/Mykel-M/disc-music-bot/tree/klooger-bot-dev)

status: `Pre-Alpha`

build: `Development`

## Authors

Mykel-M

samuelbachet


## Overview

Development version of klooger-bot to test logical functions.

Built on top of the basic bot that can be created with the official [Discord.js guide](https://discordjs.guide/).

Please review comments in the source code for explanations. 
- Some explanations are not all correct or properly explained, please feel free to improve them.

This build is in its very early stages of development. It serves to test some core functions of the proposed music system to be used for our master-branch application.

- **i.e) `/play` and `/queue` as well as all the modules and nodes.**

ChatGPT has been used sparingly to provide clarity on logical processes, syntax and algorithms and generate some complex code. 
- You will see in the comments where AI generation was used completely.

## Requirements
- [Node.js](https://nodejs.org/en)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) **(linter)**

## Setup
- Do `npm install` for dependencies
- Rename `config.json.example` to config.json
	- Enter the required values
	- Do `node index.js` to begin

## Linter
We are using ESLint as our linter. This is why the configuration has been included.
Please follow the linter rules so formatting is consistent.

## Commands
- `/ping` : Pings the bot for a response
- `/play` : Validates a YouTube URL and sends a response
- `/queue` : Validates a YouTube URL and sends URL to a queue; can be repeated up to 5 times

## Nodes

- `test.js` : Connects bot to the server with the token in config.json
	- Do `npm test`
- `index.js` : Starts up the bot
- `deploy-commands.js` : Refreshes commands

## Modules

**Can use:**
- `queueState.js` : Stores the variables of the queue system for streamHandler to retrieve
- `songState.js` : Stores the variables of the active song for streamHandler to retrieve
- `streamHandler.js` : Process URLs to play songs and process the queue

**Do not use:**
- `logger.js.unused` : Logger script to track console logs; not used in this build

## Events
- `interactionCreate.js` : Handles interactions for slash commands
- `ready.js` : Handles the ready state of the bot after index.js is executed

## Contribution
Please feel free contribute however and whatever you like.