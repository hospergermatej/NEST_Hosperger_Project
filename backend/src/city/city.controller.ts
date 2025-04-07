import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';

import {CityService} from "./city.service";
import {CityEntity} from "./city.entity";
import {CreateCityDto} from "./dto/create-city.dto";
import {UpdateCityDto} from "./dto/update-city.dto";


@Controller('city')
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

     @Post()
     createCity(
         @Body() CityDto: CreateCityDto
        ): Promise<CityEntity> {
      return this.cityService.createCity(CityDto);
     }


}