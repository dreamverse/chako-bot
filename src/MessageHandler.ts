import { NaturalLanguage } from './NaturalLanguage';
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
            console.log(`command: ${chatInstance.author.username}: ${message}`);
            const text =  _.trimStart(message, this.commandCharacter);
            const command = new Command(text);

            if (command.Name === 'tell') {
                if (chatInstance.author.username === 'Sylkis') {
                    const tell = new Command(command.Args)
                    const target = this.getMessageTarget(tell.Name);
                    if (tell.Args) {
                        chatInstance.channel.send(`${target}: ${tell.Args}`);
                    }
                } else {
                    chatInstance.channel.send('no');
                }
            } else {
                chatInstance.channel.send(`I don't know how to '${command}'`);
            }
        } else {
            let naturalLanguage = new NaturalLanguage();
            naturalLanguage.handleRequest(message).then((response) => {
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