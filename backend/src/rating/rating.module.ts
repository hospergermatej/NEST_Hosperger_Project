import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RatingEntity} from "./rating.entity";
import {RatingController} from "./rating.controller";
import {RatingService} from "./rating.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            RatingEntity
        ])
    ],
    controllers: [
        RatingController,
    ],
    providers: [
        RatingService,
    ],
})
export class RatingModule {}