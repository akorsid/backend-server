// Подключаем библиотеку MQTT
const mqtt = require('mqtt');

// Подключаемся к брокеру
const brokerUrl = 'mqtt://localhost:1883'; // Или IP-адрес брокера
const client = mqtt.connect(brokerUrl);

// Тема для публикации
const topic = 'kupriv';

// Действия при подключении
client.on('connect', () => {
  console.log('Подключено к брокеру');
  // Публикуем сообщение
  client.publish(topic, 'Привет от MQTT Publisher!', { qos: 1 }, (err) => {
    if (!err) {
      console.log('Сообщение успешно опубликовано');
    } else {
      console.error('Ошибка при публикации сообщения:', err);
    }
    client.end(); // Завершаем соединение после публикации
  });
});