import { Module } from '@nestjs/common';
import {StudentsModule} from "./students/students.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Student} from "./students/model/student.entity";
import {Class} from "./classes/model/class.entity";
import {CityEntity} from "./city/city.entity";
import {PlaceModule} from "./place/place.module";
import {CityModule} from "./city/city.module";
import {PlaceController} from "./place/place.controller";
import {CityController} from "./city/city.controller";
import {PlaceService} from "./place/place.service";
import {CityService} from "./city/city.service";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'db_nest',
      entities: [

        CityEntity,
      ],
      synchronize: true,
    }),

    PlaceModule,
      CityModule,
  ],
  controllers: [
      PlaceController,
      CityController,
  ],
  providers: [
      PlaceService,
      CityService
  ],
})
export class AppModule {}
