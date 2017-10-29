import { IFunctionMap } from './IFunctionMap';
import { ShoppingList } from '../shoppingList/ShoppingList'
import { ShoppingListItem } from '../shoppingList/ShoppingListItem'

export const Commands: IFunctionMap = {
    'shoppingList.add': (params): Promise<string> => {
        const number = params.number;
        const item = params.item;

        return new Promise((resolve, reject) => {
            if (!item) reject('Add what?');
            if (!number) reject('How many?');

            const listItem = new ShoppingListItem(item, number);
            ShoppingList.addItem(listItem);
            console.log(ShoppingList.toString());
            resolve();
        });
    },
    'shoppingList.show': (params): Promise<string> => {
        return new Promise((resolve, reject) => {
            console.log(ShoppingList.toString());
            resolve();
        });
    },
    'shoppingList.delete': (params): Promise<string> => {
        const item = params.item;

        return new Promise((resolve, reject) => {
            if (!item) reject('Add what?');

            ShoppingList.deleteItem(item);
            console.log(ShoppingList.toString());
            resolve();
        });
    },
    'roleManagement.add': (params, chatInstance): Promise<string> => {
        const roleName = params.role;
        const guildMember = chatInstance.member;
        const role = chatInstance.guild.roles.find('name', roleName);

        return new Promise((resolve, reject) => {
            if (!role) reject(`I don\'t know about the role ${role}`);
            
            resolve(guildMember.addRole(role).then(() => {
                return;
            }).catch((error: any) => {
                console.log(error);
                reject(error.message);
            }));
        });
    },
    'roleManagement.remove': (params, chatInstance): Promise<string> => {
        const roleName = params.role;
        const guildMember = chatInstance.member;
        const role = chatInstance.guild.roles.find('name', roleName);

        return new Promise((resolve, reject) => {
            if (!role) reject(`I don\'t know about the role ${role}`);

            resolve(guildMember.removeRole(role).then(() => {
                return;
            }).catch((error: any) => {
                console.log(error);
                reject(error.message);
            }));
        });
    }
}