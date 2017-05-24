const _ = require('lodash');

import { Command } from './Command';
import { AppConfig } from './../AppConfig';

export class CommandHandler {
    discordClient: any;

    constructor(discordClient:any) {
        this.discordClient = discordClient;
    }

    handleRequest(chatInstance:any, message:string):void {
        const command = new Command(message);

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