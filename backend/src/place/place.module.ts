import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import {PlaceEntity} from "./place.entity";
import {PlaceController} from "./place.controller";
import {PlaceService} from "./place.service";
import {CommentEntity} from "../comment/comment.entity";
import {RatingEntity} from "../rating/rating.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
                PlaceEntity,CommentEntity,RatingEntity
        ])
    ],
    controllers: [
        PlaceController,
    ],
    providers: [
        PlaceService,
    ],
})
export class PlaceModule {}