import { IFunctionMap } from './IFunctionMap';
import { ShoppingList } from '../shoppingList/ShoppingList'
import { ShoppingListItem } from '../shoppingList/ShoppingListItem'

export const CommandHandlers: IFunctionMap = {
    'shoppingList.add': (chatInstance, result): Promise<string> => {
        const params = result.parameters;
        const amount = params.number;
        const item = params.item;

        return new Promise((resolve, reject) => {
            if (!item) reject('Add what?');
            if (!amount) reject('How many?');

            const listItem = new ShoppingListItem(item, amount);
            const list = new ShoppingList();

            resolve(list.addItem(listItem).then(() => {
                return result.fulfillment.speech;
            }).catch((error: any) => {
                console.log(error);
                return `I can't, because: ${error.message}`;
            }));
        });
    },
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