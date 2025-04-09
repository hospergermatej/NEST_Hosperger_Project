import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {RatingEntity} from "./rating.entity";

@Injectable()
export class RatingService {

    constructor(
        @InjectRepository(RatingEntity)
        private ratingEntityRepository: Repository<RatingEntity>,
    ) {}


    getRating(): Promise<RatingEntity[]> {
        return this.ratingEntityRepository.find({});
    }


}