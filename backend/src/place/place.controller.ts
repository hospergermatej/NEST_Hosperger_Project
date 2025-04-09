import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {PlaceService} from "./place.service";
import {PlaceEntity} from "./place.entity";
import {CityEntity} from "../city/city.entity";
import {CommentEntity} from "../comment/comment.entity";
import {RatingEntity} from "../rating/rating.entity";

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

    @Get(':id/comments')
    getCommentsByPlace(
        @Param('id', ParseIntPipe) id:number
    ): Promise<CommentEntity[]> {
        return this.placeService.getCommentsByPlace(id);
    }

    @Post(':id/comments')
    createComment(
        @Param('id',ParseIntPipe) id:number,
        @Body() comment:CommentEntity
    ){
        return this.placeService.createComment(id,comment);
    }

    @Get(':id/rating')
    getRatingsByPlace(
        @Param('id',ParseIntPipe) id:number
    ): Promise<RatingEntity[]>{
        return this.placeService.getRatingsByPlace(id)
    }

    @Post(':id/rating')
    createRating(
        @Param('id',ParseIntPipe) id: number,
        @Body() rating:RatingEntity
    ){
        return this.placeService.createRating(id,rating)
    }

}