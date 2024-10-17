abstract class Scheduler {
    protected timeoutId: ReturnType<typeof setTimeout> | null = null;

    abstract run(): void;

    constructor(protected callback: () => void) {}
    
    start() {
 //       console.log("Запуск процесса");
        this.run();
    }

    stop() {
        if (this.timeoutId !== null) {
            clearTimeout(this.timeoutId);
//            console.log("Процесс остановлен");
            this.timeoutId = null;
        }
    }

    protected setTimeout(delay: number, replay: boolean = false) {
        this.timeoutId = setTimeout(() => {
            this.callback();
            if (replay) this.force();
        }, delay);
    }

    force() {
 //       console.log("Выполняется перезапуск процесса");
        this.stop();
        this.start();
    }
}

class DailyScheduler extends Scheduler {
    private hour: number;
    private minute: number;

    constructor(hour: number, minute: number, callback: () => void) {
        super(callback);
        this.hour = hour;
        this.minute = minute;
    }

    run() {
        const now = new Date();
        let targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), this.hour, this.minute, 0, 0);

        if (targetTime.getTime() <= now.getTime()) {
            targetTime.setDate(targetTime.getDate() + 1);
        }

        const timeDifference = targetTime.getTime() - now.getTime();
        console.log(`Будильник установлен на ${targetTime}`);

        this.setTimeout(timeDifference, true);
    }
}

class ReminderScheduler extends Scheduler {
    private targetTime: Date;

    constructor(targetTime: Date, callback: () => void) {
        super(callback);
        this.targetTime = targetTime;
    }

    run() {
        const now = new Date();

        if (this.targetTime.getTime() <= now.getTime()) {
            console.log("Напоминание уже прошло.");
            return;
        }

        const timeDifference = this.targetTime.getTime() - now.getTime();
        console.log(`Напоминание установлено на ${this.targetTime}`);

        this.setTimeout(timeDifference);
    }
}

class TimerScheduler extends Scheduler {
    private seconds: number;

    constructor(seconds: number, callback: () => void) {
        super(callback);
        this.seconds = seconds;
    }

    run() {
        console.log(`Таймер установлен на ${this.seconds} секунд`);

        this.setTimeout(this.seconds * 1000)
    }
}

class IntervalScheduler extends Scheduler {
    private seconds: number;

    constructor(seconds: number, callback: () => void) {
        super(callback);
        this.seconds = seconds;
    }

    run() {
        console.log(`Интервал установлен на ${this.seconds} секунд`);

        this.setTimeout(this.seconds * 1000, true)
    }
}

// Пример использования:
const dailyAlarm = new DailyScheduler(20, 14, () => {
    console.log("Запуск ежедневного процесса!");
});
dailyAlarm.start(); // Запуск будильника

const reminderAlarm = new ReminderScheduler(new Date(2024, 8, 22, 20, 40), () => {
    console.log("Запуск напоминания!");
});
reminderAlarm.start(); // Запуск напоминания

const timerAlarm = new TimerScheduler(2, () => {
    console.log("Запуск таймера!");
});
timerAlarm.start(); // Запуск таймера 

const intervalAlarm = new IntervalScheduler(2, () => {
    console.log("Запуск интервала!");
});
intervalAlarm.start(); // Запуск интервала