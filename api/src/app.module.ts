import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose'
import { ChartModule } from './chart/chart.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://db/test'), ChartModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
