var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Scheduler = /** @class */ (function () {
    function Scheduler() {
        this.timeoutId = null;
    }
    Scheduler.prototype.start = function () {
        console.log("Запуск процесса");
        this.run();
    };
    Scheduler.prototype.stop = function () {
        if (this.timeoutId !== null) {
            clearTimeout(this.timeoutId);
            console.log("Процесс остановлен");
            this.timeoutId = null;
        }
    };
    Scheduler.prototype.setTimeout = function (callback, delay) {
        this.timeoutId = setTimeout(function () {
            callback();
        }, delay);
    };
    Scheduler.prototype.setInterval = function (callback, interval) {
        this.timeoutId = setInterval(function () {
            callback();
        }, interval);
    };
    Scheduler.prototype.force = function () {
        console.log("Выполняется перезапуск процесса");
        this.stop();
        this.start();
    };
    return Scheduler;
}());
var DailyScheduler = /** @class */ (function (_super) {
    __extends(DailyScheduler, _super);
    function DailyScheduler(hour, minute, callback) {
        var _this = _super.call(this) || this;
        _this.hour = hour;
        _this.minute = minute;
        _this.callback = callback;
        return _this;
    }
    DailyScheduler.prototype.run = function () {
        var _this = this;
        var now = new Date();
        var targetTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), this.hour, this.minute, 0, 0);
        if (targetTime.getTime() <= now.getTime()) {
            targetTime.setDate(targetTime.getDate() + 1);
        }
        var timeDifference = targetTime.getTime() - now.getTime();
        console.log("\u0411\u0443\u0434\u0438\u043B\u044C\u043D\u0438\u043A \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D \u043D\u0430 ".concat(targetTime));
        this.timeoutId = setTimeout(function () {
            console.log("Будильник сработал!");
            _this.callback();
            _this.start(); // Устанавливаем следующий будильник через 24 часа
        }, timeDifference);
    };
    return DailyScheduler;
}(Scheduler));
var ReminderScheduler = /** @class */ (function (_super) {
    __extends(ReminderScheduler, _super);
    function ReminderScheduler(targetTime, callback) {
        var _this = _super.call(this) || this;
        _this.targetTime = targetTime;
        _this.callback = callback;
        return _this;
    }
    ReminderScheduler.prototype.run = function () {
        var _this = this;
        var now = new Date();
        if (this.targetTime.getTime() <= now.getTime()) {
            console.log("Напоминание уже прошло.");
            return;
        }
        var timeDifference = this.targetTime.getTime() - now.getTime();
        console.log("\u041D\u0430\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u043E \u043D\u0430 ".concat(this.targetTime));
        this.timeoutId = setTimeout(function () {
            console.log("Напоминание сработало!");
            _this.callback();
        }, timeDifference);
    };
    return ReminderScheduler;
}(Scheduler));
var TimerScheduler = /** @class */ (function (_super) {
    __extends(TimerScheduler, _super);
    function TimerScheduler(seconds, callback) {
        var _this = _super.call(this) || this;
        _this.seconds = seconds;
        _this.callback = callback;
        return _this;
    }
    TimerScheduler.prototype.run = function () {
        var _this = this;
        console.log("\u0422\u0430\u0439\u043C\u0435\u0440 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D \u043D\u0430 ".concat(this.seconds, " \u0441\u0435\u043A\u0443\u043D\u0434"));
        this.timeoutId = setTimeout(function () {
            console.log("Таймер сработал!");
            _this.callback();
        }, this.seconds * 1000);
    };
    return TimerScheduler;
}(Scheduler));
var IntervalScheduler = /** @class */ (function (_super) {
    __extends(IntervalScheduler, _super);
    function IntervalScheduler(seconds, callback) {
        var _this = _super.call(this) || this;
        _this.seconds = seconds;
        _this.callback = callback;
        return _this;
    }
    IntervalScheduler.prototype.run = function () {
        var _this = this;
        console.log("\u0418\u043D\u0442\u0435\u0440\u0432\u0430\u043B \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D \u043D\u0430 ".concat(this.seconds, " \u0441\u0435\u043A\u0443\u043D\u0434"));
        var intervalFunction = function () {
            console.log("Интервал сработал!");
            _this.callback();
            _this.run(); // Устанавливаем следующий интервал
        };
        this.timeoutId = setTimeout(intervalFunction, this.seconds * 1000);
    };
    return IntervalScheduler;
}(Scheduler));
// Пример использования:
var dailyAlarm = new DailyScheduler(20, 14, function () {
    console.log("Запуск ежедневного процесса!");
});
dailyAlarm.start(); // Запуск будильника
var reminderAlarm = new ReminderScheduler(new Date(2024, 8, 22, 20, 40), function () {
    console.log("Запуск напоминания!");
});
reminderAlarm.start(); // Запуск напоминания
var timerAlarm = new TimerScheduler(2, function () {
    console.log("Запуск таймера!");
});
timerAlarm.start(); // Запуск таймера
var intervalAlarm = new IntervalScheduler(2, function () {
    console.log("Запуск интервала!");
});
intervalAlarm.start(); // Запуск интервала
