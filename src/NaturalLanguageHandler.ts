const apiai = require('apiai');
const UuidV4 = require('uuid/v4');
const _ = require('lodash');

import { AppConfig } from './../AppConfig';

export class NaturalLanguageHandler {
    aiClient:any;
    uuid: string;

    constructor() {
        this.aiClient = apiai(new AppConfig().APIAI_TOKEN);
        this.uuid = UuidV4();
    }

    handleRequest(chatInstance:any, message:string) {
        console.log(`NaturalLanguage: ${message}`);
        var request = this.aiClient.textRequest(message, {
            sessionId: this.uuid
        });

        request.on('response', (response:any) => {
            chatInstance.channel.send(response.result.fulfillment.speech);
        });

        request.on('error', (error:any) => {
            console.log(error);
        });

        request.end();
    }
}