export class ShoppingListItem {
    amount: number;
    name: string;

    constructor(name: string, amount: number) {
        this.name = name;
        this.amount = amount;
    }

    public toString(): string {
        return `${this.amount} ${this.name}`;
    }
}