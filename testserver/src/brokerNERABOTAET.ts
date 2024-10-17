import Aedes from 'aedes'; // Импортируем Aedes как экспорт по умолчанию
import { AedesPublishPacket, Client } from 'aedes';
import { createServer } from 'aedes-server-factory';
import WebSocket from 'ws';
import { createServer as createHttpServer } from 'http';


// Порт для TCP соединений (MQTT)
const TCP_PORT = 1883;

// Порт для WebSocket соединений (MQTT через WebSocket)
const WS_PORT = 8888;

// Создаем Aedes экземпляр (MQTT брокер)
const broker = new Aedes(); // Используем new

// Логгируем события подключения клиента
broker.on('client', (client: Client) => {
    console.log(`Клиент подключился: ${client.id}`);
});

// Логгируем события отключения клиента
broker.on('clientDisconnect', (client: Client) => {
    console.log(`Клиент отключился: ${client.id}`);
});

// Логгируем события публикации сообщений
broker.on('publish', (packet: AedesPublishPacket, client: Client | null) => {
    if (client) {
        console.log(`Клиент ${client.id} опубликовал сообщение: ${packet.topic}`);
    }
});

// Создаем TCP сервер для MQTT
const tcpServer = createServer(broker);

// Запускаем TCP сервер
tcpServer.listen(TCP_PORT, () => {
    console.log(`MQTT брокер запущен на порту ${TCP_PORT}`);
});

// Создаем WebSocket сервер для MQTT over WebSocket
const httpServer = createHttpServer();
const wsServer = new WebSocket.Server({ server: httpServer });

wsServer.on('connection', (ws: WebSocket) => {
    const stream = WebSocket.createWebSocketStream(ws);
    broker.handle(stream);
});

// Запускаем WebSocket сервер
httpServer.listen(WS_PORT, () => {
    console.log(`MQTT брокер через WebSocket запущен на порту ${WS_PORT}`);
});

//тимур молодец