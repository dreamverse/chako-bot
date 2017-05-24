const { Wit } = require('node-wit');
const _ = require('lodash');

import { AppConfig } from './../AppConfig';

export class NaturalLanguageHandler {
    witClient:any;
    responseMap: { [index: string]: string; } = { 
        'temperature_get': 'temperature? what?',
        'positive': '＼(*´▽`*)／',
        'negative': '｡･ﾟﾟ･(≧д≦)･ﾟﾟ･｡',
        'dance': '♫ヽ(゜∇゜ヽ)♪♬(ノ゜∇゜)ノ♩♪',
    };

    constructor() {
        this.witClient = new Wit({
            accessToken: new AppConfig().WIT_TOKEN,
        })
    }

    handleRequest(message:string):Promise<string> {
        const promise = this.witClient.message(message, {}).then((data:any) => {
            let response: string = ':3 ?';
            console.log(data);
            const entities = data.entities;
            if (!_.isEmpty(entities)) {
                if (entities.intent) {
                    response = this.intentHandler(entities.intent);
                } else if (entities.greetings) {
                    response = this.greetingHandler(entities.greetings);
                } else if (entities.thanks) {
                    response = this.thanksHandler(entities.thanks);
                }
            }

            // don't understand the message, return default response
            return response;
        })

        return promise;
    }

    intentHandler(intents:any) {
        const intent:string = intents[0].value;
        if (intent in this.responseMap) {
            return this.responseMap[intent];
        }
        return `I don't have a response for ${intent}...`;
    }

    greetingHandler(greetings:any) {
        console.log(greetings);
        const nothing = 1;
        return 'hi';
    }

    thanksHandler(thanks:any) {
        console.log(thanks);
        return this.responseMap['positive'];
    }
}