import { NaturalLanguageHandler } from './NaturalLanguageHandler';

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
        
        let naturalLanguageHandler = new NaturalLanguageHandler(this.discordClient);
        naturalLanguageHandler.handleRequest(chatInstance, message);
    }
}