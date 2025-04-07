import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {CityEntity} from "./city.entity";
import {CityController} from "./city.controller";
import {CreateCityDto} from "./dto/create-city.dto";

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(CityEntity)
        private cityEntityRepository: Repository<CityEntity>,
    ) {}


    getCities(): Promise<CityEntity[]> {
        return this.cityEntityRepository.find({});
    }

    getCitiesByID(id: number): Promise<CityEntity> {
       return this.cityEntityRepository.findOneBy({ id });
     }

    createCity(dto: CreateCityDto): Promise<CityEntity> {
       const city = new CityEntity();

      // TODO
        city.name = CreateCityDto.name


     return this.cityEntityRepository.save(city);
    }

    // delete(id: number): void {
    //   this.studentsRepository.delete(id);
    // }
}