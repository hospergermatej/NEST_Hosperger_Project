import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CityEntity} from "./city/city.entity";
import {PlaceModule} from "./place/place.module";
import {CityModule} from "./city/city.module";
import {PlaceController} from "./place/place.controller";
import {CityController} from "./city/city.controller";
import {PlaceService} from "./place/place.service";
import {CityService} from "./city/city.service";
import {PlaceEntity} from "./place/place.entity";
import {CommentEntity} from "./comment/comment.entity";
import {TypeEntity} from "./type/type.entity";
import {CommentModule} from "./comment/comment.module";
import {TypeModule} from "./type/type.module";
import {RatingEntity} from "./rating/rating.entity";
import {RatingModule} from "./rating/rating.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysqlstudenti.litv.sssvt.cz',
      port: 3306,
      username: 'hospergermatej',
      password: '123456',
      database: '4a2_hospergermatej_db2',
      entities: [

        CityEntity,
          PlaceEntity,
          CommentEntity,
          TypeEntity,
          RatingEntity
      ],
      synchronize: true,
    }),

    PlaceModule,
      CityModule,
      CommentModule,
      TypeModule,
      RatingModule
  ],
  controllers: [

  ],
  providers: [

  ],
})
export class AppModule {}
