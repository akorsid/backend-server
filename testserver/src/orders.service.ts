import { Injectable } from '@nestjs/common';
import { data } from './data'
import { AnyTxtRecord } from 'dns';

@Injectable()
export class OrdersService {
    constructor() {
        // Парсинг JSON данных
        const orders: any = data;

        // Инициализация наборов для хранения уникальных клиентов и товаров
        const uniqueCustomers: any = new Set();
        const uniqueProducts: any = new Set();

        // Проход по каждому заказу для извлечения уникальных клиентов и товаров
        orders.forEach(order => {
            // Добавление клиента в набор
            const customer = order.customer;
            uniqueCustomers.add(JSON.stringify(customer)); // Сохранение в виде строки JSON для обеспечения уникальности

            // Добавление каждого товара в набор
            order.items.forEach(item => {
                const product = { productId: item.productId, productName: item.productName };
                uniqueProducts.add(JSON.stringify(product)); // Сохранение в виде строки JSON для обеспечения уникальности
            });
        });

        // Преобразование наборов обратно в массивы и парсинг JSON строк
        const customersArray = Array.from(uniqueCustomers).map(JSON.parse as any);
        const productsArray = Array.from(uniqueProducts).map(JSON.parse as any);

        console.log('Уникальные клиенты:', customersArray);
        console.log('Уникальные товары:', productsArray);
    }
}

