'use strict';

const Discord = require('discord.js');
const client = new Discord.Client();
const readline = require('readline');

import { NaturalLanguageHandler } from './NaturalLanguageHandler';
import { AppConfig } from './../AppConfig';
import { CommandHandler} from './CommandHandler';

const config = new AppConfig();

client.on('ready', () => {
    console.log('command> ');
});

client.on('message', (instance: any) => {
    if (instance.content.includes(`<@${config.BOT_ID}>`)) {
        let message = instance.content;
        if (message.includes(`<@${config.BOT_ID}> `)) {
            message = message.replace(`<@${config.BOT_ID}> `, '');
        }

        if (message === '') {
            instance.channel.send('(｡･ω･｡) ?');
        }
        
        let naturalLanguageHandler = new NaturalLanguageHandler(client);
        naturalLanguageHandler.handleRequest(instance, message);
    }
});

client.login(config.BOT_TOKEN);

// debug helper
// ActionName [paramName paramValue]
const debugCommandHandler = new CommandHandler();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt('command> ');

rl.on('line', (line :string) => {
    const args = line.split(' ');
    const actionName = args[0];
    const paramsObj: any = {};

    for (var i = 1; i < args.length; i+=2) {
        const paramName = args[i];
        paramsObj[paramName] = args[i+1];
    }

    debugCommandHandler.handleDebugRequest(actionName, paramsObj);
    rl.prompt();
}).on('close', () => {
    console.log('exiting');
    process.exit(0);
})