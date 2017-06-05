const _ = require('lodash');

import { AppConfig } from './../AppConfig';

export class CommandHandler {
    discordClient: any;
    handlers: IFunctionMap = {
        'roleManagement.add': (chatInstance, result): Promise<string> => {
            const params = result.parameters;
            const roleName = params.role;
            const guildMember = chatInstance.member;
            const role = chatInstance.guild.roles.find('name', roleName);

            return new Promise((resolve, reject) => {
                if (role) {
                    resolve(guildMember.addRole(role).then(() => {
                        return result.fulfillment.speech;
                    }).catch((error: any) => {
                        console.log(error);
                        return `I can't, because: ${error.message}`;
                    }));
                } else {
                    reject('I can\'t');
                }
            });
        },
        'roleManagement.remove': (chatInstance, result): Promise<string> => {
            const params = result.parameters;
            const roleName = params.role;
            const guildMember = chatInstance.member;
            const role = chatInstance.guild.roles.find('name', roleName);


            return new Promise((resolve, reject) => {
                if (role) {
                    resolve(guildMember.removeRole(role).then(() => {
                        return result.fulfillment.speech;
                    }).catch((error: any) => {
                        console.log(error);
                        return `I can't, because: ${error.message}`;
                    }));
                } else {
                    reject('I can\'t');
                }
            });
        }
    }

    constructor(discordClient:any) {
        this.discordClient = discordClient;
    }

    handleRequest(chatInstance:any, result:any):Promise<string> {
        const action = result.action;

        return new Promise((resolve, reject) => {
            if (this.handlers[action]) {
                resolve(this.handlers[action](chatInstance, result));
            } else {
                reject(`Unknown action: ${action}`);
            }
        });
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
    [key: string]: (chatInstance:any, parameters:any) => Promise<string>;
}