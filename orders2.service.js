const fs = require('fs');

// Чтение данных из JSON файла
fs.readFile('C:/Users/jenky/PycharmProjects/data.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Ошибка при чтении файла:', err);
        return;
    }

    try {
        // Парсинг JSON данных
        const orders = JSON.parse(data);

        // Инициализация наборов для хранения уникальных клиентов и товаров
        const uniqueCustomers = new Set();
        const uniqueProducts = new Set();

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
        const customersArray = Array.from(uniqueCustomers).map(JSON.parse);
        const productsArray = Array.from(uniqueProducts).map(JSON.parse);

        console.log('Уникальные клиенты:', customersArray);
        console.log('Уникальные товары:', productsArray);

    } catch (parseError) {
        console.error('Ошибка при парсинге JSON данных:', parseError);
    }
});
