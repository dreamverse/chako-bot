const _ = require('lodash');

import { AppConfig } from './../AppConfig';
import { IFunctionMap } from './command/IFunctionMap';
import { CommandHandlers } from './command/CommandHandlers'

export class CommandHandler {
    discordClient: any;
    handlers: IFunctionMap = CommandHandlers;

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
}