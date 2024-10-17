"use strict";
var aedes = require('aedes');
var net = require('net');
var jwt = require('jsonwebtoken');

var PORT = 1883;
var SECRET_KEY = 'your-secret-key';

// Создаем брокер Aedes
var broker = aedes();

// Настраиваем авторизацию через JWT
broker.authenticate = function (client, username, password, callback) {
    try {
        var token = password.toString();
        var decoded = jwt.verify(token, SECRET_KEY);
        console.log(`Клиент ${username} авторизован:`, decoded);
        callback(null, true);
    } catch (error) {
        console.log(`Ошибка авторизации клиента ${username}`);
        var authError = Object.assign(new Error('Ошибка авторизации'), {
            name: 'AuthenticateError',
            returnCode: 4 // Используем правильный код ошибки
        });
        callback(authError, false);
    }
};

// Обработка подключения клиентов
broker.on('client', function (client) {
    console.log(`Клиент подключен: ${client.id}`);
});

// Обработка публикации сообщений
broker.on('publish', function (packet, client) {
    if (client) {
        console.log(`Сообщение от клиента ${client.id}: ${packet.payload.toString()}`);
    }
});

// Запуск брокера на TCP порту
var server = net.createServer(broker.handle);
server.listen(PORT, function () {
    console.log(`MQTT брокер запущен на порту ${PORT}`);
});
