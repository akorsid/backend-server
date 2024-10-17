"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aedes_1 = require("aedes");
var net_1 = require("net");
var jsonwebtoken_1 = require("jsonwebtoken");
var PORT = 1883;
var SECRET_KEY = 'your-secret-key';
// Создаем брокер Aedes
var broker = new aedes_1.default();
// Настраиваем авторизацию через JWT
broker.authenticate = function (client, username, password, callback) {
    try {
        var token = password.toString();
        var decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        console.log("\u041A\u043B\u0438\u0435\u043D\u0442 ".concat(username, " \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u043E\u0432\u0430\u043D:"), decoded);
        callback(null, true);
    }
    catch (error) {
        console.log("\u041E\u0448\u0438\u0431\u043A\u0430 \u0430\u0432\u0442\u043E\u0440\u0438\u0437\u0430\u0446\u0438\u0438 \u043A\u043B\u0438\u0435\u043D\u0442\u0430 ".concat(username));
        // Создаем правильный объект ошибки для callback
        var authError = Object.assign(new Error('Ошибка авторизации'), {
            name: 'AuthenticateError', // Добавляем поле name
            returnCode: 4 /* AuthErrorCode.BAD_USERNAME_OR_PASSWORD */ // Используем правильный код ошибки
        });
        callback(authError, false);
    }
};
// Обработка подключения клиентов
broker.on('client', function (client) {
    console.log("\u041A\u043B\u0438\u0435\u043D\u0442 \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D: ".concat(client.id));
});
// Обработка публикации сообщений
broker.on('publish', function (packet, client) {
    if (client) {
        console.log("\u0421\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435 \u043E\u0442 \u043A\u043B\u0438\u0435\u043D\u0442\u0430 ".concat(client.id, ": ").concat(packet.payload.toString()));
    }
});
// Запуск брокера на TCP порту
var server = (0, net_1.createServer)(broker.handle);
server.listen(PORT, function () {
    console.log("MQTT \u0431\u0440\u043E\u043A\u0435\u0440 \u0437\u0430\u043F\u0443\u0449\u0435\u043D \u043D\u0430 \u043F\u043E\u0440\u0442\u0443 ".concat(PORT));
});
