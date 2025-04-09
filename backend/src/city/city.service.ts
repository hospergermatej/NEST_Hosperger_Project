import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

import {CityEntity} from "./city.entity";
import {CityController} from "./city.controller";
import {CreateCityDto} from "./dto/create-city.dto";
import {PlaceEntity} from "../place/place.entity";
import {PlaceService} from "../place/place.service";
import {PlaceController} from "../place/place.controller";

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(CityEntity)
        private cityEntityRepository: Repository<CityEntity>,
        @InjectRepository(PlaceEntity)
        private placeEntityRepository: Repository<PlaceEntity>
    ) {}


    getCities(): Promise<CityEntity[]> {
        return this.cityEntityRepository.find({});
    }

    getCitiesByID(id: number): Promise<CityEntity> {
       return this.cityEntityRepository.findOneBy({ id });
     }


     async getPlacesByCity(id:number): Promise<PlaceEntity[]>{
        const city = await this.cityEntityRepository.findOne({where:{id:id},relations:['Places']})
         return city.Places
     }

    async CreatePlace(id:number,place:PlaceEntity): Promise<PlaceEntity>{
        const city = await this.cityEntityRepository.findOne({where:{id:id}})
        const newPlace = new PlaceEntity(place.name,place.description,city,null)
        return this.placeEntityRepository.save(newPlace)
    }

}