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
            if (this.isNaturalLanguage(response.result.action)) {
                this.handleNatural(chatInstance, response);
            } else {
                this.handleCommand(chatInstance, response);
            }
        });

        request.on('error', (error:any) => {
            console.log(error);
        });

        request.end();
    }

    isNaturalLanguage(action:string) {
        return _.startsWith(action, 'smalltalk') || _.startsWith(action, 'input.unknown');
    }

    handleNatural(chatInstance:any, response:any) {
        chatInstance.channel.send(response.result.fulfillment.speech);
    }

    handleCommand(chatInstance:any, response:any)  {
        this.commandHandler.handleRequest(chatInstance, response.result).then((successMessage: string) => {
            chatInstance.channel.send(successMessage);
        }).catch((errorMessage: string) => {
            console.log(errorMessage);
            chatInstance.channel.send(response.result.fulfillment.speech);
        });
    }
}