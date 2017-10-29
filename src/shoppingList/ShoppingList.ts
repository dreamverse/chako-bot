import { ShoppingListItem } from './ShoppingListItem';
const storage = require('node-persist');
const storageName = 'globalList';
storage.initSync();

export class ShoppingList {
    public static addItem(item: ShoppingListItem) {
        let items = storage.getItemSync(storageName);
        if (!items) {
            items = {};
        }

        let currentAmount: number = 0;

        if (items[item.name]) {
            currentAmount = Number(items[item.name]);
        }
        console.log('current:', currentAmount);
        currentAmount += Number(item.amount);
        console.log('current:', currentAmount);
        items[item.name] = currentAmount

        storage.setItemSync(storageName, items);
    }

    public static deleteItem(itemName: string) {
        let items = storage.getItemSync(storageName);
        if (!items) {
            items = {};
        }

        console.log(items);
        delete items[itemName];
        console.log(items);
        storage.setItemSync(storageName, items);
    }

    public static toString(): string {
        const items = storage.getItemSync(storageName);
        return items;
    }
}