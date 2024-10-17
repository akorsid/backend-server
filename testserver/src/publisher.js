"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mqtt_1 = require("mqtt");
var brokerUrl = 'mqtt://localhost:1883';
var client = mqtt_1.default.connect(brokerUrl, {
    username: 'client1',
    password: 'your-jwt-token' // Генерируется с помощью сервера
});
var topic = 'учеба';
// Объект для передачи
var message = {
    type: 'долги',
    content: {
        text: 'кол-во:',
        numbers: [2],
    },
};
client.on('connect', function () {
    console.log('Подключено к брокеру');
    client.publish(topic, JSON.stringify(message), { qos: 1 }, function (err) {
        if (!err) {
            console.log('Сообщение отправлено');
        }
        else {
            console.error('Ошибка при отправке сообщения:', err);
        }
        client.end();
    });
});
