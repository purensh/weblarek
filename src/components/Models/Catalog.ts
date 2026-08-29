// Каталог

import { IProduct } from '../../types';

export class Catalog {
    private items: IProduct[] = [];
    private selected: IProduct | null = null;

    getItems(): IProduct[] {
        return this.items;
    }

    setItems(items: IProduct[]): void {
        this.items = items;
    }

    getItem(id: string): IProduct | undefined {
        return this.items.find(item => item.id === id);
    }

    setSelected(item: IProduct): void {
        this.selected = item;
    }

    getSelected(): IProduct | null {
        return this.selected;
    }
}