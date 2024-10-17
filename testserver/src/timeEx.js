function setDailyAlarm(hour, minute, callback) {
    const now = new Date();
    let targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0);

    // Если целевое время уже прошло, будильник будет установлен на следующий день
    if (targetTime.getTime() <= now.getTime()) {
        targetTime.setDate(targetTime.getDate() + 1);
    }

    const timeDifference = targetTime.getTime() - now.getTime();

    console.log(`Будильник установлен на ${targetTime}`);

    setTimeout(function dailyAlarm() {
        console.log("Будильник сработал!");
        callback(); // Запуск процесса

        // Перенастраиваем будильник на следующий день
        setTimeout(dailyAlarm, 24 * 60 * 60 * 1000); // Через 24 часа
    }, timeDifference);
}

function setReminderAlarm(targetTime, callback) {
    const now = new Date();

    // Если целевое время уже прошло, будильник будет установлен на следующий день
    if (targetTime.getTime() <= now.getTime()) {
        return
    }

    const timeDifference = targetTime.getTime() - now.getTime();

    console.log(`Напоминание установлено на ${targetTime}`);

    setTimeout(function () {
        console.log("Напоминание сработало!");
        callback(); // Запуск процесса
    }, timeDifference);
}

function setTimerAlarm(seconds, callback) {

    console.log(`Таймер установлен на ${seconds} секунд`);

    setTimeout(function () {
        console.log("Таймер сработал!");
        callback(); // Запуск процесса
    }, seconds * 1000);
}

function setIntervalAlarm(seconds, callback) {

    console.log(`Интервал установлен на ${seconds} секунд`);

    setTimeout(function () {
        console.log("Интервал сработал!");
        callback(); // Запуск процесса
        setIntervalAlarm(seconds, callback);
    }, seconds * 1000);
}

/*********************************************************************************************************************** */
// Пример использования:
setDailyAlarm(20, 14, () => {
    console.log("Запуск ежедневного процесса!"); // Это сработает каждый день в 15:30
});
setReminderAlarm(new Date(2024,8,22,20,40), () => {
    console.log("Запуск напоминания!"); 
  });
setTimerAlarm(2, () => {
    console.log("Запуск таймера!"); 
  });
setIntervalAlarm(2, () => {
    console.log("Запуск интервала!"); 
  });
/**
 * 1) Ежедневный будильник
 * 2) Напоминание, срабатывание по наступлению опр даты и времени
 * 3) Напоминание через отсчет (таймер)
 * 4) Секундомер
 * todo Реализовать (через классы) планироващик, для остановки и запуска 
 */