import { NaturalLanguageHandler } from './NaturalLanguageHandler';
import { CommandHandler } from './CommandHandler';
import { Command } from './Command';

const _ = require('lodash');

export class MessageHandler {
    commandCharacter:string = '/';
    discordClient:any;

    constructor(discordClient:any) {
        this.discordClient = discordClient;
    }

    handleRequest(chatInstance:any, message:string):void {
        if (message === '') {
            chatInstance.channel.send(':3 ?');
        }
        
        if (_.startsWith(message, this.commandCharacter)) {
            console.log(`command: ${chatInstance.author.username} uses "${message}"`);
            const text =  _.trimStart(message, this.commandCharacter);
            let commandHandler = new CommandHandler(this.discordClient);
            commandHandler.handleRequest(chatInstance, text);
        } else {
            let naturalLanguageHandler = new NaturalLanguageHandler();
            naturalLanguageHandler.handleRequest(message).then((response) => {
                chatInstance.channel.send(response);
            });
        }
    }

    getMessageTarget(name: string):string {
        const user = this.discordClient.users.find('username', name)
        if (user) {
            return `<@${user.id}>`;
        }
        // else don't try using a mention
        return name;
    }
}