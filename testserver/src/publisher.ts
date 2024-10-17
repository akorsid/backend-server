import mqtt from 'mqtt';

const brokerUrl = 'mqtt://localhost:1883';
const client = mqtt.connect(brokerUrl, {
  username: 'client1',
  password: 'your-jwt-token' // Генерируется с помощью сервера
});

const topic = 'учеба';

// Объект для передачи
const message = {
  type: 'долги',
  content: {
    text: 'кол-во:',
    numbers: [2],
  },
};

client.on('connect', () => {
  console.log('Подключено к брокеру');
  client.publish(topic, JSON.stringify(message), { qos: 1 }, (err) => {
    if (!err) {
      console.log('Сообщение отправлено');
    } else {
      console.error('Ошибка при отправке сообщения:', err);
    }
    client.end();
  });
});
