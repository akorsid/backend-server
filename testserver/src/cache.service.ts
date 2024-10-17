import { Injectable } from '@nestjs/common';
import axios from 'axios'
import { XMLParser } from 'fast-xml-parser'

@Injectable()
export class CacheService {
    courseMap = new Map();
    private currentDate: string;

    constructor() {
        this.updateDateAndFetchData();
        setInterval(() => {
            this.updateDateAndFetchData();
        }, 43200000);
    }

    private updateDateAndFetchData() {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        this.currentDate = `${day}.${month}.${year}`;
        this.getCacheList();
    }

    async getCacheList() {
        const course = await axios.get(`https://www.cbr.ru/scripts/XML_daily.asp?date_req=${this.currentDate}`);
        
        const parser = new XMLParser();
        let courseObject = parser.parse(course.data).ValCurs.Valute;
        for (let i = 0; i < courseObject.length; i++) {
            this.courseMap.set(courseObject[i].CharCode, courseObject[i]);
        }
    }

    getCourseByCharCode(charCode) {
        return this.courseMap.get(charCode);
    }
}