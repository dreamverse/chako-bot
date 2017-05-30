const _ = require('lodash');

import { AppConfig } from './../AppConfig';

export class CommandHandler {
    discordClient: any;
    handlers: IFunctionMap = {
        'roleManagement.add': (chatInstance, params) => {
            console.log('add to role: ' + params.role);
            const roleName = params.role;
            const guildMember = chatInstance.member;
            const role = chatInstance.guild.roles.find('name', roleName);
            if (role) {
                guildMember.addRole(role);
            } else {
                chatInstance.channel.send(`what role is ${roleName}?`);
            }
        }
    }

    constructor(discordClient:any) {
        this.discordClient = discordClient;
    }

    handleRequest(chatInstance:any, result:any):void {
        const action = result.action;

        if (_.startsWith(action, 'smalltalk')) {
            return;
        } else if (this.handlers[action]) {
            this.handlers[action](chatInstance, result.parameters);
        } else {
            chatInstance.channel.send('???');
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

interface IFunctionMap {
    [key: string]: (chatInstance:any, parameters:any) => void;
}