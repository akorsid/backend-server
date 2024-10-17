// Подключаем библиотеку MQTT
const mqtt = require('mqtt');

// Подключаемся к брокеру
const brokerUrl = 'mqtt://localhost:1883'; // Или IP-адрес брокера
const client = mqtt.connect(brokerUrl);

// Тема для подписки
const topic = 'kupriv';

// Действия при подключении
client.on('connect', () => {
  console.log('Подключено к брокеру');
  // Подписываемся на тему
  client.subscribe(topic, { qos: 1 }, (err) => {
    if (!err) {
      console.log(`Подписка на тему '${topic}' успешно выполнена`);
    } else {
      console.error('Ошибка при подписке на тему:', err);
    }
  });
});

// Действия при получении сообщения
client.on('message', (topic, message) => {
  console.log(`Получено сообщение с темы '${topic}': ${message.toString()}`);
});