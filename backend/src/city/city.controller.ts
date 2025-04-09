import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';

import {CityService} from "./city.service";
import {CityEntity} from "./city.entity";
import {PlaceEntity} from "../place/place.entity";


@Controller('cities')
export class CityController {
    constructor(
        private readonly cityService: CityService
    ) {
    }

    @Get()
    getCities(): Promise<CityEntity[]> {
        return this.cityService.getCities();
    }
     @Get(':id')
     getCitiesByID(
         @Param('id', ParseIntPipe) id: number
     ): Promise<CityEntity> {
       return this.cityService.getCitiesByID(id);
     }

    @Get(':id/places')
    getPlacesByCity(
        @Param('id',ParseIntPipe) id: number
    ): Promise<PlaceEntity[]>{
        return this.cityService.getPlacesByCity(id)
    }

    @Post(':id/places')
    CreatePlace(
        @Param('id',ParseIntPipe) id: number,
        @Body() place:PlaceEntity
    ){
        return this.cityService.CreatePlace(id,place)
    }


}