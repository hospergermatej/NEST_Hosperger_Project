import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {PlaceService} from "./place.service";
import {PlaceEntity} from "./place.entity";
import {CityEntity} from "../city/city.entity";

@Controller('place')
export class PlaceController {
    constructor(
        private readonly placeService: PlaceService
    ) {
    }

    @Get()
    getPlaces(): Promise<PlaceEntity[]> {
        return this.placeService.getPlaces();
    }

    @Get(':id')
    getPlacesByID(
        @Param('id', ParseIntPipe) id: number
    ): Promise<PlaceEntity> {
        return this.placeService.getPlacesByID(id);
    }
}