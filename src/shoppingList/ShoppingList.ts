import { ShoppingListItem } from './ShoppingListItem';
const storage = require('node-persist');

export class ShoppingList {
    items: Array<ShoppingListItem>;
    name: string;
    storage: any;

    constructor(name: string = 'global') {
        this.name = name;
        this.storage = storage.init()
        .then(() => {
            return storage.getItem(name);
        })
        .then((list: ShoppingList) => {
            if (!list) return
            this.items = list.items;
        });
    }

    public show(): string {
        return this.toString();
    }

    public addItem(item: ShoppingListItem) {
        this.items.push(item);
        return this.persist();
    }

    persist() {
        return this.storage.setItem(this.name, this);
    }

    public toString(): string {
        return this.items.toString();
    }
}