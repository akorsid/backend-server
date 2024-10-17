import aedes, { Client, AuthenticateError, AuthErrorCode } from 'aedes';
import { createServer } from 'net';
import jwt from 'jsonwebtoken';

const PORT = 1883;
const SECRET_KEY = 'your-secret-key';

// Создаем брокер Aedes
const broker = new aedes();

// Настраиваем авторизацию через JWT
broker.authenticate = (client: Client, username: string, password: Buffer, callback: (error: AuthenticateError | null, success: boolean) => void) => {
  try {
    const token = password.toString();
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(`Клиент ${username} авторизован:`, decoded);
    callback(null, true);
  } catch (error) {
    console.log(`Ошибка авторизации клиента ${username}`);
    
    // Создаем правильный объект ошибки для callback
    const authError: AuthenticateError = Object.assign(new Error('Ошибка авторизации'), {
      name: 'AuthenticateError', // Добавляем поле name
      returnCode: AuthErrorCode.BAD_USERNAME_OR_PASSWORD // Используем правильный код ошибки
    });
    callback(authError, false);
  }
};

// Обработка подключения клиентов
broker.on('client', (client) => {
  console.log(`Клиент подключен: ${client.id}`);
});

// Обработка публикации сообщений
broker.on('publish', (packet, client) => {
  if (client) {
    console.log(`Сообщение от клиента ${client.id}: ${packet.payload.toString()}`);
  }
});

// Запуск брокера на TCP порту
const server = createServer(broker.handle);
server.listen(PORT, () => {
  console.log(`MQTT брокер запущен на порту ${PORT}`);
});
