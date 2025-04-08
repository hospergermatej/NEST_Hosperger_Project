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
          PlaceEntity,
          CommentEntity,
          TypeEntity,
      ],
      synchronize: true,
    }),

    PlaceModule,
      CityModule,
      CommentModule,
      TypeModule
  ],
  controllers: [

  ],
  providers: [

  ],
})
export class AppModule {}
