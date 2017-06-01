const apiai = require('apiai');
const UuidV4 = require('uuid/v4');
const _ = require('lodash');

import { AppConfig } from './../AppConfig';
import { CommandHandler } from './CommandHandler';

export class NaturalLanguageHandler {
    aiClient:any;
    uuid: string;
    commandHandler: any;

    constructor(discordClient: any) {
        this.aiClient = apiai(new AppConfig().APIAI_TOKEN);
        this.uuid = UuidV4();
        
        this.commandHandler = new CommandHandler(discordClient);
        
    }

    handleRequest(chatInstance:any, message:string) {
        console.log(`NaturalLanguage: ${message}`);
        var request = this.aiClient.textRequest(message, {
            sessionId: this.uuid
        });

        request.on('response', (response:any) => {
            if (_.startsWith(response.result.action, 'smalltalk') || _.startsWith(response.result.action, 'input.unknown')) {
                chatInstance.channel.send(response.result.fulfillment.speech);
            } else {
                this.commandHandler.handleRequest(chatInstance, response.result);
            }
        });

        request.on('error', (error:any) => {
            console.log(error);
        });

        request.end();
    }
}