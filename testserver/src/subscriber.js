"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mqtt_1 = require("mqtt");
var brokerUrl = 'mqtt://localhost:1883';
var client = mqtt_1.default.connect(brokerUrl, {
    username: 'client1',
    password: 'your-jwt-token' // Генерируется с помощью сервера
});
var topic = 'учеба';
client.on('connect', function () {
    console.log('Подключено к брокеру');
    client.subscribe(topic, { qos: 1 }, function (err) {
        if (!err) {
            console.log("\u041F\u043E\u0434\u043F\u0438\u0441\u043A\u0430 \u043D\u0430 \u0442\u0435\u043C\u0443 '".concat(topic, "' \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0430"));
        }
        else {
            console.error('Ошибка подписки:', err);
        }
    });
});
client.on('message', function (topic, message) {
    try {
        var parsedMessage = JSON.parse(message.toString());
        console.log("\u041F\u043E\u043B\u0443\u0447\u0435\u043D\u043E \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435:", parsedMessage);
    }
    catch (e) {
        console.error('Ошибка при разборе сообщения:', e);
    }
});
