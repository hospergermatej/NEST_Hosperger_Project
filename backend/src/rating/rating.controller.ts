import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {RatingService} from "./rating.service";
import {RatingEntity} from "./rating.entity";

@Controller('rating')
export class RatingController {
    constructor(
        private readonly ratingService: RatingService
    ) {
    }

    @Get()
    getRating(): Promise<RatingEntity[]> {
        return this.ratingService.getRating();
    }

}