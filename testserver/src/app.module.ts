import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheService } from './cache.service';
import { WeatherService } from './weather.service';
import { OrdersService } from './orders.service';

@Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService, CacheService, WeatherService, OrdersService],
})
export class AppModule {}
