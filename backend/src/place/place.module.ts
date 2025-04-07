import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import {PlaceEntity} from "./place.entity";
import {PlaceController} from "./place.controller";
import {PlaceService} from "./place.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([
                PlaceEntity
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