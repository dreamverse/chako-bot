const _ = require('lodash');

import { AppConfig } from './../AppConfig';

export class CommandHandler {
    discordClient: any;
    handlers: IFunctionMap = {
        'roleManagement.add': (chatInstance, result) => {
            const params = result.parameters;
            const roleName = params.role;
            const guildMember = chatInstance.member;
            const role = chatInstance.guild.roles.find('name', roleName);
            if (role) {
                guildMember.addRole(role).then(() => {
                    chatInstance.channel.send(result.fulfillment.speech);
                }).catch((error: any) => {
                    console.log(error);
                    chatInstance.channel.send(`I can't, because: ${error.message}`);
                });
            } else {
                chatInstance.channel.send(`I can't`);
            }
        },
        'roleManagement.remove': (chatInstance, result) => {
            const params = result.parameters;
            const roleName = params.role;
            const guildMember = chatInstance.member;
            const role = chatInstance.guild.roles.find('name', roleName);
            if (role) {
                guildMember.removeRole(role).then(() => {
                    chatInstance.channel.send(result.fulfillment.speech);
                }).catch((error: any) => {
                    console.log(error);
                    chatInstance.channel.send(`I can't, because: ${error.message}`);
                });
            } else {
                chatInstance.channel.send(`I can't`);
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
            this.handlers[action](chatInstance, result);
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