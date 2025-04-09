import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CityController} from "./city.controller";
import {CityService} from "./city.service";
import {CityEntity} from "./city.entity";
import {PlaceEntity} from "../place/place.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            CityEntity,
            PlaceEntity

        ])
    ],
    controllers: [
        CityController,
    ],
    providers: [
        CityService,
    ],
})
export class CityModule {}