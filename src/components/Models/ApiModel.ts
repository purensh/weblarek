// Для работы с API

import { IApi, IProductsResponse, IOrderRequest, IOrderResult } from '../../types';

export class ApiModel {
    private api: IApi;

    constructor(api: IApi) {
        this.api = api;
    }

    getProducts(): Promise<IProductsResponse> {
        return this.api.get<IProductsResponse>('/product/');
    }

    order(orderData: IOrderRequest): Promise<IOrderResult> {
        return this.api.post<IOrderResult>('/order', orderData);
    }
}