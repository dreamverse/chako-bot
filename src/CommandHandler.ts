const _ = require('lodash');

import { AppConfig } from './../AppConfig';
import { IFunctionMap } from './command/IFunctionMap';
import { Commands } from './command/Commands'

export class CommandHandler {
    discordClient: any;
    handlers: IFunctionMap = Commands;
    debug: boolean;

    constructor(discordClient: any = undefined) {
        if (!discordClient) {
            this.debug = true;
        } else {
            this.discordClient = discordClient;
        }
    }

    handleRequest(chatInstance: any, apiResponse: any):Promise<string> {
        const action = apiResponse.action;

        return new Promise((resolve, reject) => {
            const executeFn = this.handlers[action];
            if (!executeFn) reject(`Unknown action: ${action}`);
            
            const execute = executeFn(apiResponse.parameters, chatInstance);
            execute.then(() => {
                resolve(apiResponse.fulfillment.speech);
            }).catch((reason: string) => {
                resolve(`I can't, because: ${reason}`);
            })
        });
    }

    handleDebugRequest(action: string, params: any): Promise<string> {
        if (!this.debug) return Promise.reject('not debug mode');

        const executeFn = this.handlers[action];
        if (!executeFn) return Promise.reject(`Unknown action: ${action}`);
        
        return Promise.resolve(executeFn(params));
    }
}