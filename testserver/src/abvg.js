// Абстрактный класс Scheduler
class Scheduler {
    constructor() {
        this.timeoutId = null;
    }

    // Абстрактный метод, который должен быть реализован в наследниках
    run() {
        throw new Error("Метод 'run()' должен быть реализован.");
    }

    start() {
        console.log("Процесс запущен");
        this.run();
    }

    stop() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
            console.log("Процесс остановлен");
        }
    }

    force() {
        console.log("Принудительный запуск процесса");
        this.run();
    }
}

// DailyAlarm, ReminderAlarm, TimerAlarm и IntervalAlarm наследуют Scheduler

class DailyAlarm extends Scheduler {
    constructor(hour, minute, callback) {
        super();
        this.hour = hour;
        this.minute = minute;
        this.callback = callback;
    }

    run() {
        const now = new Date();
        let targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), this.hour, this.minute, 0, 0);

        if (targetTime.getTime() <= now.getTime()) {
            targetTime.setDate(targetTime.getDate() + 1);
        }

        const timeDifference = targetTime.getTime() - now.getTime();
        console.log(`Будильник установлен на ${targetTime}`);

        this.timeoutId = setTimeout(() => {
            console.log("Будильник сработал!");
            this.callback();
            this.start(); // Устанавливаем следующий будильник через 24 часа
        }, timeDifference);
    }
}

class ReminderAlarm extends Scheduler {
    constructor(targetTime, callback) {
        super();
        this.targetTime = targetTime;
        this.callback = callback;
    }

    run() {
        const now = new Date();

        if (this.targetTime.getTime() <= now.getTime()) {
            console.log("Напоминание уже прошло.");
            return;
        }

        const timeDifference = this.targetTime.getTime() - now.getTime();
        console.log(`Напоминание установлено на ${this.targetTime}`);

        this.timeoutId = setTimeout(() => {
            console.log("Напоминание сработало!");
            this.callback();
        }, timeDifference);
    }
}

class TimerAlarm extends Scheduler {
    constructor(seconds, callback) {
        super();
        this.seconds = seconds;
        this.callback = callback;
    }

    run() {
        console.log(`Таймер установлен на ${this.seconds} секунд`);

        this.timeoutId = setTimeout(() => {
            console.log("Таймер сработал!");
            this.callback();
        }, this.seconds * 1000);
    }
}

class IntervalAlarm extends Scheduler {
    constructor(seconds, callback) {
        this.seconds = seconds;
        this.callback = callback;
    }

    run() {
        console.log(`Интервал установлен на ${this.seconds} секунд`);

        const intervalFunction = () => {
            console.log("Интервал сработал!");
            this.callback();
            this.run(); // Устанавливаем следующий интервал
        };

        this.timeoutId = setTimeout(intervalFunction, this.seconds * 1000);
    }
}

// Пример использования:

const dailyAlarm = new DailyAlarm(20, 14, () => {
    console.log("Запуск ежедневного процесса!");
});
dailyAlarm.start(); // Запуск будильника

const reminderAlarm = new ReminderAlarm(new Date(2024, 8, 22, 20, 40), () => {
    console.log("Запуск напоминания!");
});
reminderAlarm.start(); // Запуск напоминания

const timerAlarm = new TimerAlarm(2, () => {
    console.log("Запуск таймера!");
});
timerAlarm.start(); // Запуск таймера

const intervalAlarm = new IntervalAlarm(2, () => {
    console.log("Запуск интервала!");
});
intervalAlarm.start(); // Запуск интервала
