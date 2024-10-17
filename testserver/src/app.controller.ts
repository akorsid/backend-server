import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheService } from './cache.service';
import { WeatherService } from './weather.service';
import { OrdersService } from './orders.service';

@Controller()
export class AppController {
    constructor(
        private readonly appService: AppService,
        private readonly cacheService: CacheService,
        private readonly weatherService: WeatherService,
        private readonly ordersService: OrdersService,
    ) {}

    /*@Get()
    getHello(): string {
        const currentDate = new Date();

        const weatherMoscow =
            this.weatherService.getWeatherByCityName('Moscow');

        return `
    Текущая дата: ${currentDate.toDateString()} <br>
    Курс доллара: ${this.cacheService.getCourseByCharCode('USD').Value} <br>
    Курс евро: ${this.cacheService.getCourseByCharCode('EUR').Value} <br>
    Температура: ${weatherMoscow.main.temp} <br>
    Ощущается как: ${weatherMoscow.main.feels_like} <br>
    Макс Температура: ${weatherMoscow.main.temp_max} <br>
    Мин Температура: ${weatherMoscow.main.temp_min}<br>
    `;
    }
}
*/

@Get()
    getHello(): string {
        const currentDate = new Date();
        const weatherMoscow = this.weatherService.getWeatherByCityName('Moscow');

        // Данные о клиентах
        /*const personalData = [
            {
                id: 'C001',
                name: 'John Doe',
                email: 'john@example.com',
            },
            {
                id: 'C002',
                name: 'Jane Smith',
                email: 'jane@example.com',
            },
        ];

        // Данные о продуктах
        const products = [
            {
                productId: 'P001',
                productName: 'Laptop',
                price: 1200,
            },
            {
                productId: 'P002',
                productName: 'Mouse',
                price: 20,
            },
            {
                productId: 'P003',
                productName: 'Keyboard',
                price: 45,
            },
        ];

        // Данные о заказах
        const orders = [
            {
                orderId: 'O001',
                customerId: 'C001',
                products: ['P001', 'P002'],
            },
            {
                orderId: 'O002',
                customerId: 'C002',
                products: ['P003'],
            },
        ];

        // Создаем строку с информацией о заказах
        let ordersInfo = '<br>Информация о заказах:<br>';

        for (const order of orders) {
            const customer = personalData.find(c => c.id === order.customerId);
            const orderedProducts = order.products
                .map(productId => {
                    const product = products.find(p => p.productId === productId);
                    return product ? product.productName : 'Unknown Product';
                })
                .join(', ');

            ordersInfo += `
                <br>Заказ ID: ${order.orderId} <br>
                Клиент: ${customer ? customer.name : 'Unknown Customer'} <br>
                Товары: ${orderedProducts} <br>
            `;
        }*/

        return `
            Текущая дата: ${currentDate.toDateString()} <br>
            Курс доллара: ${this.cacheService.getCourseByCharCode('USD').Value} <br>
            Курс евро: ${this.cacheService.getCourseByCharCode('EUR').Value} <br>
            Температура: ${weatherMoscow.main.temp} <br>
            Ощущается как: ${weatherMoscow.main.feels_like} <br>
            Макс Температура: ${weatherMoscow.main.temp_max} <br>
            Мин Температура: ${weatherMoscow.main.temp_min} <br>
        `;
    }
}