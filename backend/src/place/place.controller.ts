import {Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put} from '@nestjs/common';
import {PlaceService} from "./place.service";
import {PlaceEntity} from "./place.entity";
import {CityEntity} from "../city/city.entity";
import {CommentEntity} from "../comment/comment.entity";


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


    @Delete(':id')
    deletePlace(
        @Param('id',ParseIntPipe) id:number,

    ){
        return this.placeService.deletePlace(id)
    }

    @Delete(':id/comments/:commentID')
    deleteComment(
        @Param('id',ParseIntPipe) id:number,
        @Param('commentID',ParseIntPipe) commentID:number
    ){
        return this.placeService.deleteComments(id,commentID)
    }

    @Put(':id')
    updatePlace(
        @Param('id',ParseIntPipe) id:number,
        @Body() place:PlaceEntity
    ){
        return this.placeService.updatePlace(id,place)
    }

    @Put(':id/rating/:rating')
    updateRating(
        @Param('id',ParseIntPipe) id:number,
        @Param('rating',ParseIntPipe) rating:number

    ){
        return this.placeService.createRating(id, rating)
    }

}