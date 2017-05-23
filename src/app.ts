const Discord = require('discord.js');
const client = new Discord.Client();

import { MessageHandler } from './MessageHandler';
import { AppConfig } from './../AppConfig';

const config = new AppConfig();

// The ready event is vital, it means that your bot will only start reacting to information
client.on('ready', () => {
    console.log('I am ready');
});

// Create an event listener for messages
client.on('message', (instance: any) => {
    if (instance.content.includes(`<@${config.BOT_ID}>`)) {
        let message = instance.content;
        if (message.includes(`<@${config.BOT_ID}> `)) {
            message = message.replace(`<@${config.BOT_ID}> `, '');
        }

        const handler = new MessageHandler(client);
        handler.handleRequest(instance, message);
    }
});

// Log our bot in
client.login(config.BOT_TOKEN);