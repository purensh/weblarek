// Покупатель

import { IBuyer, TPayment } from '../../types';

export class Buyer {
    private payment: TPayment = '';
    private email: string = '';
    private phone: string = '';
    private address: string = '';

    setData(data: Partial<IBuyer>): void {
        if (data.payment !== undefined) this.payment = data.payment;
        if (data.email !== undefined) this.email = data.email;
        if (data.phone !== undefined) this.phone = data.phone;
        if (data.address !== undefined) this.address = data.address;
    }

    getData(): IBuyer {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address,
        };
    }

    clear(): void {
        this.payment = '';
        this.email = '';
        this.phone = '';
        this.address = '';
    }

    validate(): Partial<Record<keyof IBuyer, string>> {
        const errors: Record<string, string> = {};

        if (!this.payment) {
            errors.payment = 'Не выбран вид оплаты';
        }
        if (!this.address) {
            errors.address = 'Укажите адрес доставки';
        }
        if (!this.email) {
            errors.email = 'Укажите email';
        }
        if (!this.phone) {
            errors.phone = 'Укажите телефон';
        }

        return Object.keys(errors).length > 0 ? (errors as Record<keyof IBuyer, string>) : null;
    }
}