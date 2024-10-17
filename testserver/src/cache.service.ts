import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';
/** 
* + получение курса валют на текущую дату(правильно вставить в запрос)
* + добавить возможность получения температуры в Москве
* + и по курсу валют и по температура преобразовать методы запроса в интервальные(чтобы запрос происходил раз в какое-то время. сервер запустился один раз и на длительный период.
    1) изменить ссылку
    2) добавить интервалы(setinterval)
    кеш сервис раз в день, везер раз в сутки
* @todo загрузить сервер(проект) на гитхаб, склонировать на декстоп( на жесткий диск). 
*/
function getCurrentDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}

@Injectable()
export class CacheService {
    courseMap = new Map();

    constructor() {
        this.getCacheList();
        setInterval(() => {
            this.getCacheList();
        }, 43200000);
    }
    async getCacheList() {
        const course = await axios.get(
            `https://www.cbr.ru/scripts/XML_daily.asp?date_req=${getCurrentDate()}`,
        );

        const parser = new XMLParser();
        const courseObject = parser.parse(course.data).ValCurs.Valute;
        for (let i = 0; i < courseObject.length; i++) {
            this.courseMap.set(courseObject[i].CharCode, courseObject[i]);
        }
    }

    getCourseByCharCode(charCode) {
        return this.courseMap.get(charCode);
    }
}
